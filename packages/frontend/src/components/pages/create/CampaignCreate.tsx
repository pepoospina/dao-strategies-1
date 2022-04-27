import { Button } from 'antd';
// import { transactor } from 'eth-components/functions';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAppContracts } from '~~/config/contractContext';
import { CampaignCreatedEvent } from '~~/generated/typechain/CampaignFactory';
import { getMerkleTree } from '~~/services/strategyComputation';

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

export interface ICampaignCreateProps {
  dum?: any;
}

export const CampaignCreate: FC<ICampaignCreateProps> = () => {
  const ethersContext = useEthersContext();
  const campaignFactoryContract = useAppContracts('CampaignFactory', ethersContext.chainId);
  const history = useHistory();

  const createCampaign = async (): Promise<void> => {
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */

    const tree = await getMerkleTree();

    const strategyHash = RANDOM_BYTES32;

    const account = ethersContext.account;
    if (account === undefined) throw new Error('account undefined');
    const salt = ethers.utils.keccak256(ethers.utils.hashMessage(account + Date.now().toString()));

    // const tx = transactor(ethComponentsSettings, ethersContext?.signer);
    // if (tx === undefined) throw new Error('tx undefined');

    if (campaignFactoryContract === undefined) throw new Error('campaignFactoryContract undefined');
    if (ethersContext === undefined) throw new Error('ethersContext undefined');
    if (ethersContext.account === undefined) throw new Error('ethersContext.account undefined');

    const ex = await campaignFactoryContract.createCampaign(
      { sharesMerkleRoot: tree.getHexRoot(), totalShares: tree.totalSupply },
      strategyHash,
      account,
      account,
      true,
      ethers.BigNumber.from(1000),
      salt
    );
    const txReceipt = await ex.wait();

    if (txReceipt.events === undefined) throw new Error('txReceipt.events undefined');
    const event = txReceipt.events.find((e) => e.event === 'CampaignCreated') as CampaignCreatedEvent;

    if (event === undefined) throw new Error('event undefined');
    if (event.args === undefined) throw new Error('event.args undefined');

    const campaignAddress = event.args.newCampaign;

    history.push(`/campaign/${campaignAddress}`);
  };

  return (
    <>
      <Link to="/">Back</Link>
      <Button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async (): Promise<void> => {
          await createCampaign();
        }}
        disabled={ethersContext.account === undefined}>
        Create
      </Button>
    </>
  );
};
