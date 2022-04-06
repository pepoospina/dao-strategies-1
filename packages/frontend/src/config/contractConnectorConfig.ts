/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createConnectorForHardhatContract } from 'eth-hooks/context';

import hardhatContractsJson from '../generated/hardhat_contracts.json';

import { CampaignFactory__factory, SampleToken__factory } from '~~/generated/typechain';

export const contractConnectorConfig = () => {
  try {
    const result = {
      // 🙋🏽‍♂️ Add your hadrdhat contracts here
      CampaignFactory: createConnectorForHardhatContract(
        'CampaignFactory',
        CampaignFactory__factory,
        hardhatContractsJson
      ),

      SampleToken: createConnectorForHardhatContract('SampleToken', SampleToken__factory, hardhatContractsJson),

      // 🙋🏽‍♂️ Add your external contracts here, make sure to define the address in `externalContractsConfig.ts`
      // DAI: createConnectorForExternalContract('DAI', externalContracts.DAI__factory, externalContractsAddressMap),
      // UNI: createConnectorForExternalContract('UNI', externalContracts.UNI__factory, externalContractsAddressMap),

      // 🙋🏽‍♂️ Add your external abi here (unverified contracts)`
      // DAI: createConnectorForExternalAbi('DAI', { 1: {address: 'xxxx'}}, abi),
    } as const;

    return result;
  } catch (e) {
    console.error(
      '❌ contractConnectorConfig: ERROR with loading contracts please run `yarn contracts:build or yarn contracts:rebuild`.  Then run `yarn deploy`!',
      e
    );
  }

  return undefined;
};

export type TAppConnectorList = NonNullable<ReturnType<typeof contractConnectorConfig>>;
