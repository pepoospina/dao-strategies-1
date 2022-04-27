import { AccountAndBalance, BalanceTree } from '@dao-strategies/core';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { Campaign, Campaign__factory, CampaignFactory__factory } from './../typechain';
import { toWei, getTimestamp, fastForwardToTimestamp } from './support';

const LOG = true;

(BigNumber.prototype as any).toJSON = function () {
  // eslint-disable-next-line
  return this.toString();
};

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';
const URI: string = RANDOM_BYTES32;
// const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

interface SetupData {
  admin: SignerWithAddress;
  guardian: SignerWithAddress;
  oracle: SignerWithAddress;
  funders: SignerWithAddress[];
  tree: BalanceTree;
  merkleRoot: string;
  totalShares: BigNumber;
  claimersBalances: AccountAndBalance[];
  campaign: Campaign;
}

describe('campaign', () => {
  async function setup(sharesDistribution: BigNumber[], publishShares: boolean): Promise<SetupData> {
    const addresses = await ethers.getSigners();
    const admin = addresses[0];
    const guardian = addresses[1];
    const oracle = addresses[2];
    const claimers = addresses.slice(4, 4 + sharesDistribution.length);
    const funders = addresses.slice(4 + sharesDistribution.length);
    // eslint-disable-next-line no-param-reassign
    const totalShares = sharesDistribution.reduce((sum, currentNum) => (sum = sum.add(currentNum)), BigNumber.from(0));
    const claimersBalances = claimers.map((claimer, ix) => {
      return {
        account: claimer.address,
        balance: sharesDistribution[ix],
      };
    });

    const tree = new BalanceTree(claimersBalances);
    const merkleRoot = tree.getHexRoot();

    const currentTimestamp = await getTimestamp();
    const campaignFactoryDeployer = await ethers.getContractFactory<CampaignFactory__factory>('CampaignFactory');
    const campaignDeployer = await ethers.getContractFactory<Campaign__factory>('Campaign');

    const campaignMaster = await campaignDeployer.deploy(); // deploy cmapign master implementation
    const campaignFactory = await campaignFactoryDeployer.deploy(campaignMaster.address);
    const campaignCreationTx = await campaignFactory.createCampaign(
      { totalShares: totalShares, sharesMerkleRoot: merkleRoot },
      URI,
      guardian.address,
      oracle.address,
      publishShares,
      currentTimestamp.add(SECONDS_IN_DAY)
    );
    const campaignCreationReceipt = await campaignCreationTx.wait();
    const campaignAddress: string = (campaignCreationReceipt as any).events[0].args[1]; // get campaign proxy address from the CampaignCreated event
    const campaign = campaignDeployer.attach(campaignAddress);

    return {
      admin,
      guardian,
      oracle,
      funders,
      tree,
      merkleRoot,
      totalShares,
      claimersBalances,
      campaign,
    };
  }

  it('Should reward claimers according to shares', async () => {
    const sharesArray = [ethers.BigNumber.from('100'), ethers.BigNumber.from('200'), ethers.BigNumber.from('300')];

    const { admin, guardian, oracle, funders, tree, merkleRoot, totalShares, claimersBalances, campaign } = await setup(sharesArray, true);

    // sanity checks
    const shares: Campaign.SharesDataStructOutput = await campaign.shares();
    expect(shares.sharesMerkleRoot).to.equal(merkleRoot);
    expect(shares.totalShares).to.equal(totalShares);
    expect(await campaign.guardian()).to.equal(guardian.address);
    expect(await campaign.oracle()).to.equal(oracle.address);
    expect(await campaign.uri()).to.equal(URI);
    expect(await campaign.sharesPublished()).to.equal(true);

    // funder sends 1 ether to the campaign
    const fundTransaction = await funders[0].sendTransaction({ to: campaign.address, value: toWei('1') });
    expect(await campaign.funds(funders[0].address)).to.equal(toWei('1'));
    expect(await ethers.provider.getBalance(campaign.address)).to.equal(toWei('1'));

    // fast forward to claim period
    const _claimPeriodStart = await campaign.claimPeriodStart();
    await fastForwardToTimestamp(_claimPeriodStart.add(10));

    // claimer1 claims, should receive 1/6 ether
    const claimer1BalanceBefore = await ethers.provider.getBalance(claimersBalances[0].account);
    const proofClaimer1 = tree.getProof(claimersBalances[0].account, claimersBalances[0].balance);
    await campaign.claim(claimersBalances[0].account, claimersBalances[0].balance, proofClaimer1);
    const claimer1BalanceAfter = await ethers.provider.getBalance(claimersBalances[0].account);
    expect(claimer1BalanceAfter.sub(claimer1BalanceBefore)).to.equal(toWei('1').div(6));

    // claimer2 claims, should receive 1/3 ether
    const claimer2BalanceBefore = await ethers.provider.getBalance(claimersBalances[1].account);
    const proofClaimer2 = tree.getProof(claimersBalances[1].account, claimersBalances[1].balance);
    await campaign.claim(claimersBalances[1].account, claimersBalances[1].balance, proofClaimer2);
    const claimer2BalanceAfter = await ethers.provider.getBalance(claimersBalances[1].account);
    expect(claimer2BalanceAfter.sub(claimer2BalanceBefore)).to.equal(toWei('1').div(3));

    // claimer3 claims, should receive 1/2 ether
    const claimer3BalanceBefore = await ethers.provider.getBalance(claimersBalances[2].account);
    const proofClaimer3 = tree.getProof(claimersBalances[2].account, claimersBalances[2].balance);
    await campaign.claim(claimersBalances[2].account, claimersBalances[2].balance, proofClaimer3);
    const claimer3BalanceAfter = await ethers.provider.getBalance(claimersBalances[2].account);
    expect(claimer3BalanceAfter.sub(claimer3BalanceBefore)).to.equal(toWei('1').div(2));
  });
});
