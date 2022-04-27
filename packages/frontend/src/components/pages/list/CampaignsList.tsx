import { useEthersContext } from 'eth-hooks/context';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useCampaigns } from '~~/components/common/queries/campaigns.queries';

export interface ICampaignListProps {
  dum?: any;
}

export const CampaignsList: FC<ICampaignListProps> = (props: ICampaignListProps) => {
  const ethersContext = useEthersContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const { isLoading, campaigns } = useCampaigns();
  console.log({ isLoading, campaigns });

  return (
    <>
      {ethersContext.signer ? (
        <>
          <Link to="./create">Create</Link>
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
