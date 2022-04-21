import { Button } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useCampaigns } from '~~/components/common/queries/campaigns.queries';

import { useAppContracts } from '~~/config/contractContext';
import { CampaignCreatedEvent } from '~~/generated/typechain/CampaignFactory';
import { getMerkleTree } from '~~/services/strategyComputation';

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

export interface ICampaignListProps {
  dum?: any;
}

export const CampaignsList: FC<ICampaignListProps> = (props: ICampaignListProps) => {
  const ethersContext = useEthersContext();
  const campaignFactoryContract = useAppContracts('CampaignFactory', 31337);
  const sampleToken = useAppContracts('SampleToken', 31337);
  const history = useHistory();

  const createCampaign = async (): Promise<void> => {
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */

    const tree = await getMerkleTree();

    const strategyHash = RANDOM_BYTES32;

    if (sampleToken === undefined) throw new Error('sampleToken undefined');
    const asset = sampleToken.address;

    const account = ethersContext.account;
    if (account === undefined) throw new Error('account undefined');
    const salt = ethers.utils.keccak256(ethers.utils.hashMessage(account + Date.now().toString()));

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
    const txReceipt = await ex.wait();

    if (txReceipt.events === undefined) throw new Error('txReceipt.events undefined');
    const event = txReceipt.events.find((e) => e.event === 'CampaignCreated') as CampaignCreatedEvent;

    if (event === undefined) throw new Error('event undefined');
    if (event.args === undefined) throw new Error('event.args undefined');

    const campaignAddress = event.args.campaignAddress;

    history.push(`/campaign/${campaignAddress}`);
  };

  const { isLoading, campaigns } = useCampaigns();
  console.log({ isLoading, campaigns });

  return (
    <>
      {ethersContext.signer ? (
        <>
          <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async (): Promise<void> => {
              await createCampaign();
            }}
            disabled={ethersContext.account === undefined}>
            Create
          </Button>
        </>
      ) : (
        <></>
      )}
      <h1>Campaigns:</h1>
      {campaigns ? (
        campaigns.map((campaign: any) => {
          return (
            <>
              <p>{campaign.id}</p>
              <p>{campaign.owner}</p>
            </>
          );
        })
      ) : (
        <></>
      )}
      <br></br>
      <br></br>
    </>
  );
};
