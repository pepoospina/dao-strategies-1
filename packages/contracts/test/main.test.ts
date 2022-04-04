import { AccountAndBalance, BalanceTree } from '@dao-strategies/core';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { CampaignFactory__factory, Campaign, SampleToken, SampleToken__factory, CampaignFactory, Campaign__factory } from './../typechain';
import { toWei } from './support';

const LOG = true;

(BigNumber.prototype as any).toJSON = function () {
  // eslint-disable-next-line
  return this.toString();
};

// const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

describe('campaign', () => {
  let campaignContract: Campaign;

  let owner: SignerWithAddress;
  let claimers: SignerWithAddress[];
  let claimersBalances: AccountAndBalance[];
  let tree: BalanceTree;

  let campaignFactory: CampaignFactory;
  let daiToken: SampleToken;

  let totalFunds: BigNumber;

  beforeEach(async () => {
    totalFunds = toWei('100 000');

    if (LOG) console.log('deploy a campaign');
    const addresses = await ethers.getSigners();

    owner = addresses[0];
    // funder = addresses[2];

    const campaignFactoryFactory = await ethers.getContractFactory<CampaignFactory__factory>('CampaignFactory');
    campaignFactory = await campaignFactoryFactory.deploy();

    const daiTokenFactory: SampleToken__factory = await ethers.getContractFactory<SampleToken__factory>('SampleToken');

    daiToken = await daiTokenFactory.deploy(0, 'DAI Test', 'DAI');
    const decimals = await daiToken.decimals();

    /** initial balances */
    await daiToken.connect(owner).mint(toWei('100 000'));

    const strategyHash: string = RANDOM_BYTES32;

    claimers = addresses.slice(2, 5);

    /**
     * Account 1 : 1000 shares
     * Account 2 : 2000 shares
     * Account 3 : 3000 shares
     */
    claimersBalances = claimers.map((claimer, ix) => {
      return {
        account: claimer.address,
        balance: toWei((1000 * (ix + 1)).toString()),
      };
    });

    tree = new BalanceTree(claimersBalances);

    const merkleRoot = tree.getHexRoot();

    /** give money to funders */
    const tx = await (
      await campaignFactory.deploy(owner.address, strategyHash, merkleRoot, tree.totalSupply, daiToken.address, decimals, '', '', RANDOM_BYTES32)
    ).wait();

    const campaignContractAddress = (tx as any).events[0].args[0] as string;

    campaignContract = (await ethers.getContractFactory<Campaign__factory>('Campaign')).attach(campaignContractAddress);

    /** check */
    const totalSupplyRead = await campaignContract.totalSupply();
    expect(totalSupplyRead).to.eq(tree.totalSupply, 'Total supply not as expected');

    /** fund */
    if (LOG) console.log('fund the campaign');
    await (await daiToken.connect(owner).transfer(campaignContract.address, totalFunds)).wait();
  });

  it('merkleRoot should be correct', async () => {
    for (const claimer of claimersBalances) {
      const proof = tree.getProof(claimer.account, claimer.balance);
      await campaignContract.checkProof(claimer.account, claimer.balance, proof);
    }
  });

  it('claimers should claim', async () => {
    for (const claimer of claimersBalances) {
      const proof = tree.getProof(claimer.account, claimer.balance);
      const claimerSigner = claimers.find((c) => c.address === claimer.account);
      if (claimerSigner == undefined) throw new Error('Claimer not found');

      await campaignContract.connect(claimerSigner).claimReward(claimer.account, claimer.balance, proof);
    }
  });
});
