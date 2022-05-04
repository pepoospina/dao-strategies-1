import { BigNumber } from "ethers";

import { World } from "./world/World";

export type StrategyGate = (world: World, params: any) => Promise<Set<string>>;

export type Balances = Map<string, BigNumber>;

export type Strategy = (
  world: World,
  params: any,
  accounts: Set<string>
) => Promise<Balances>;
