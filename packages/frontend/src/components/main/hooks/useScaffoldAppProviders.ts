import { EthersModalConnector, useEthersContext } from 'eth-hooks/context';
import { TCreateEthersModalConnector, TEthersProvider } from 'eth-hooks/models';
import { useCallback, useEffect, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { invariant } from 'ts-invariant';
import { ICoreOptions } from 'web3modal';

const DEBUG = true;

export interface IScaffoldAppProviders {
  currentProvider: TEthersProvider | undefined;
  createLoginConnector: TCreateEthersModalConnector;
}

export const useScaffoldProviders = (): IScaffoldAppProviders => {
  const [web3Config, setWeb3Config] = useState<Partial<ICoreOptions>>();
  const ethersContext = useEthersContext();

  useEffect(() => {
    // import async to split bundles
    const importedConfig = import('../../../config/web3ModalConfig');

    importedConfig
      .then((getter) => {
        getter
          .getWeb3ModalConfig()
          .then((config) => {
            setWeb3Config(config);
          })
          .catch((e) => {
            invariant.error('Web3Modal", "cannot load web3 modal config', e);
          });
      })
      .catch((e) => {
        invariant.error('Web3Modal", "cannot load web3 modal config', e);
      });
  }, []);

  const { currentTheme } = useThemeSwitcher();

  const createLoginConnector: TCreateEthersModalConnector = useCallback(
    (id?: string) => {
      if (web3Config) {
        const connector = new EthersModalConnector(
          { ...web3Config, theme: currentTheme },
          { reloadOnNetworkChange: false, immutableProvider: false },
          id,
          DEBUG
        );
        return connector;
      }
    },
    [web3Config, currentTheme]
  );

  return {
    currentProvider: ethersContext.provider,
    createLoginConnector: createLoginConnector,
  };
};
