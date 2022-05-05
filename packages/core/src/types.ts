import { BigNumber } from 'ethers';

import { World } from './world/World';

export type StrategyGate = (
  world: World,
  params: any
) => Promise<Set<string> | undefined>;

export type Balances = Map<string, BigNumber>;

export type Strategy = (
  world: World,
  params: any,
  accounts: Set<string> | undefined
) => Promise<Balances>;
