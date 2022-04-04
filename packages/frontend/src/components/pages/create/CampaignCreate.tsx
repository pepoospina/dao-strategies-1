import { Button } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
// import { transactor } from 'eth-components/functions';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import { FC, useContext } from 'react';

import { useAppContracts } from '~~/config/contractContext';
import { getMerkleTree } from '~~/services/strategyComputation';

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

export interface ICampaignCreateProps {
  dum?: any;
}

export const CampaignCreate: FC<ICampaignCreateProps> = () => {
  const ethersContext = useEthersContext();

  const campaignFactoryContract = useAppContracts('CampaignFactory', ethersContext.chainId);
  const sampleToken = useAppContracts('SampleToken', ethersContext.chainId);

  console.log({ sampleToken, campaignFactoryContract });

  // const tx = transactor({}, ethersContext?.signer);
  // const ethComponentsSettings = useContext(EthComponentsSettingsContext);

  const createCampaign = async (): Promise<void> => {
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */

    const tree = await getMerkleTree();

    const strategyHash = RANDOM_BYTES32;

    if (sampleToken === undefined) throw new Error('sampleToken undefined');
    const asset = sampleToken.address;

    const account = ethersContext.account;
    if (account === undefined) throw new Error('account undefined');
    const salt = ethers.utils.keccak256(ethers.utils.hashMessage(account + '1'));

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

    // const result = tx(
    //   campaignFactoryContract.deploy(
    //     ethersContext.account,
    //     strategyHash,
    //     tree.getHexRoot(),
    //     tree.totalSupply,
    //     asset,
    //     18,
    //     '',
    //     '',
    //     salt
    //   ),
    //   (update: any) => {
    //     console.log('📡 Transaction Update:', update);
    //     if (update && (update.status === 'confirmed' || update.status === 1)) {
    //       console.log(' 🍾 Transaction ' + update.hash + ' finished!');
    //       console.log(
    //         ' ⛽️ ' +
    //           update.gasUsed +
    //           '/' +
    //           (update.gasLimit || update.gas) +
    //           ' @ ' +
    //           parseFloat(update.gasPrice) / 1000000000 +
    //           ' gwei'
    //       );
    //     }
    //   }
    // );

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
      {/* **********
       * ❓ uncomment for a second contract:
       ********** */}
      {/*
          <GenericContract
            contractName="SecondContract"
            contract={contract={contractList?.['SecondContract']}
            mainnetProvider={props.appProviders.mainnetProvider}
            blockExplorer={props.appProviders.targetNetwork.blockExplorer}
            contractConfig={props.contractConfig}
          />
        */}
    </>
  );
};
