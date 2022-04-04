import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { asEthersAdaptor } from 'eth-hooks/functions';
import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { MainPageFooter, MainPageHeader } from './components/main';

import '~~/styles/main-page.css';
import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { CampaignCreate } from '~~/components/pages';
import { BURNER_FALLBACK_ENABLED, MAINNET_PROVIDER } from '~~/config/appConfig';
import { useAppContracts, useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * See config/appConfig.ts for configuration, such as TARGET_NETWORK
 * See MainPageContracts.tsx for your contracts component
 * See contractsConnectorConfig.ts for how to configure your contracts
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * For more
 */

/**
 * The main component
 * @returns
 */
export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers

  // Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // -----------------------------
  // Load Contracts
  // -----------------------------
  // load contracts
  useLoadAppContracts();
  // connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));

  const [_, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <div className="App">
      <MainPageHeader />

      {/* Routes should be added between the <Switch> </Switch> as seen below */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <CampaignCreate />
          </Route>
          {/* you can add routes here like the below examlples */}
          <Route path="/c"></Route>
        </Switch>
      </BrowserRouter>

      <MainPageFooter />
    </div>
  );
};
