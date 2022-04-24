import { AccountAndBalance, BalanceTree } from '@dao-strategies/core';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { Campaign, Campaign__factory } from './../typechain';
import { toWei, getTimestamp, fastForwardFromBlock, fastForwardToTimestamp } from './support';

const LOG = true;

(BigNumber.prototype as any).toJSON = function () {
    // eslint-disable-next-line
    return this.toString();
};

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';
const URI: string = RANDOM_BYTES32;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

describe('campaign', () => {

    async function setup(sharesDistribution: BigNumber[], publishShares: boolean) {
        let admin: SignerWithAddress;
        let guardian: SignerWithAddress;
        let oracle: SignerWithAddress;
        let claimers: SignerWithAddress[];
        let funders: SignerWithAddress[];
        let tree: BalanceTree;
        let totalShares: BigNumber;
        let claimersBalances: AccountAndBalance[];
        let merkleRoot: string;

        const addresses = await ethers.getSigners();
        admin = addresses[0];
        guardian = addresses[1];
        oracle = addresses[2];
        claimers = addresses.slice(4, 4 + sharesDistribution.length);
        funders = addresses.slice(4 + sharesDistribution.length);
        totalShares = sharesDistribution.reduce((sum, currentNum) => (sum = sum.add(currentNum)), BigNumber.from(0));
        claimersBalances = claimers.map((claimer, ix) => {
            return {
                account: claimer.address,
                balance: sharesDistribution[ix],
            };
        });

        tree = new BalanceTree(claimersBalances);
        merkleRoot = tree.getHexRoot();

        let currentTimestamp = await getTimestamp();
        let Campaign = await ethers.getContractFactory<Campaign__factory>("Campaign");
        let campaign = await Campaign.deploy({ totalShares: totalShares, sharesMerkleRoot: merkleRoot }, URI, guardian.address, oracle.address, publishShares, currentTimestamp.add(SECONDS_IN_DAY));

        return {
            admin,
            guardian,
            oracle,
            funders,
            tree,
            merkleRoot,
            totalShares,
            claimersBalances,
            campaign
        }
    }


    it("Should reward claimers according to shares", async () => {
        const sharesArray = [ethers.BigNumber.from("100"), ethers.BigNumber.from("200"), ethers.BigNumber.from("300")];

        const {
            admin,
            guardian,
            oracle,
            funders,
            tree,
            merkleRoot,
            totalShares,
            claimersBalances,
            campaign
        } = await setup(sharesArray, true);

        // sanity checks
        let shares: Campaign.SharesDataStructOutput = await campaign.shares();
        expect(shares.sharesMerkleRoot).to.equal(merkleRoot);
        expect(shares.totalShares).to.equal(totalShares);
        expect(await campaign.guardian()).to.equal(guardian.address);
        expect(await campaign.oracle()).to.equal(oracle.address);
        expect(await campaign.uri()).to.equal(URI);
        expect(await campaign.sharesPublished()).to.equal(true);

        // funder sends 1 ether to the campaign 
        const fundTransaction = await funders[0].sendTransaction({ to: campaign.address, value: toWei("1") });
        expect(await campaign.funds(funders[0].address)).to.equal(toWei("1"));
        expect(await ethers.provider.getBalance(campaign.address)).to.equal(toWei("1"));

        // fast forward to claim period
        let _evaluationPeriodEnd = await campaign.evaluationPeriodEnd();
        await fastForwardToTimestamp(_evaluationPeriodEnd.add(10));

        // claimer1 claims, should receive 1/6 ether
        const claimer1BalanceBefore = await ethers.provider.getBalance(claimersBalances[0].account);
        const proofClaimer1 = tree.getProof(claimersBalances[0].account, claimersBalances[0].balance);
        await campaign.claim(claimersBalances[0].account, claimersBalances[0].balance, proofClaimer1);
        const claimer1BalanceAfter = await ethers.provider.getBalance(claimersBalances[0].account);
        expect(claimer1BalanceAfter.sub(claimer1BalanceBefore)).to.equal(toWei("1").div(6));

        // claimer2 claims, should receive 1/3 ether
        const claimer2BalanceBefore = await ethers.provider.getBalance(claimersBalances[1].account);
        const proofClaimer2 = tree.getProof(claimersBalances[1].account, claimersBalances[1].balance);
        await campaign.claim(claimersBalances[1].account, claimersBalances[1].balance, proofClaimer2);
        const claimer2BalanceAfter = await ethers.provider.getBalance(claimersBalances[1].account);
        expect(claimer2BalanceAfter.sub(claimer2BalanceBefore)).to.equal(toWei("1").div(3));

        // claimer3 claims, should receive 1/2 ether
        const claimer3BalanceBefore = await ethers.provider.getBalance(claimersBalances[2].account);
        const proofClaimer3 = tree.getProof(claimersBalances[2].account, claimersBalances[2].balance);
        await campaign.claim(claimersBalances[2].account, claimersBalances[2].balance, proofClaimer3);
        const claimer3BalanceAfter = await ethers.provider.getBalance(claimersBalances[2].account);
        expect(claimer3BalanceAfter.sub(claimer3BalanceBefore)).to.equal(toWei("1").div(2));

        //let temp: number = _evaluationPeriodEnd.mul(1000).toNumber();
        //let date: Date = new Date(temp);
        //console.log(date.toUTCString());

        //const campaignContractAddress = (tx as any).events[0].args[0] as string;
        //
        //campaignContract = (await ethers.getContractFactory<Campaign__factory>('Campaign')).attach(campaignContractAddress);
    });
});