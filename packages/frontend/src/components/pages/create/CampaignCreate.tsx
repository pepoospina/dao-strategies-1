import { Button } from 'antd';
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
// import { transactor } from 'eth-components/functions';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import { FC } from 'react';

import { useAppContracts, useAppContractsActions } from '~~/config/contractContext';
import { getMerkleTree } from '~~/services/strategyComputation';

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

export interface ICampaignCreateProps {
  dum?: any;
}

export const CampaignCreate: FC<ICampaignCreateProps> = () => {
  const ethersContext = useEthersContext();

  const campaignFactoryContract = useAppContracts('CampaignFactory', ethersContext.chainId);
  const sampleToken = useAppContracts('SampleToken', ethersContext.chainId);

  const createCampaign = async (): Promise<void> => {
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */

    const tree = await getMerkleTree();

    const strategyHash = RANDOM_BYTES32;

    if (sampleToken === undefined) throw new Error('sampleToken undefined');
    const asset = sampleToken.address;

    const account = ethersContext.account;
    if (account === undefined) throw new Error('account undefined');
    const salt = ethers.utils.keccak256(ethers.utils.hashMessage(account + '2'));

    // const tx = transactor(ethComponentsSettings, ethersContext?.signer);
    // if (tx === undefined) throw new Error('tx undefined');

    if (campaignFactoryContract === undefined) throw new Error('campaignFactoryContract undefined');
    if (ethersContext === undefined) throw new Error('ethersContext undefined');
    if (ethersContext.account === undefined) throw new Error('ethersContext.account undefined');

    const ex = await campaignFactoryContract.deploy(
      ethersContext.account,
      strategyHash,
      tree.getHexRoot(),
      tree.totalSupply,
      asset,
      18,
      '',
      '',
      salt
    );
    await ex.wait();

    // console.log('awaiting metamask/web3 confirm result...', result);
    console.log('await result');
  };

  return (
    <>
      <Button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async (): Promise<void> => {
          await createCampaign();
        }}
        disabled={ethersContext.account === undefined}>
        Create
      </Button>
      <br></br>
      <br></br>
      <ul>
        <li>account: {ethersContext.account}</li>
        <li>active: {ethersContext.active ? 'true' : 'false'}</li>
        <li>sampleToken: {sampleToken === undefined ? 'undefined' : sampleToken.address}</li>
      </ul>
      <Button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={(): void => {
          console.log('help');
        }}>
        Open
      </Button>
    </>
  );
};
