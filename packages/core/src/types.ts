import { BigNumber } from "ethers";

import { World } from "./world/World";

export interface AccountAndBalance {
  account: string;
  balance: BigNumber;
}

export type StrategyGate = (world: World, params: any) => Promise<Set<string>>;

export type Strategy = (
  world: World,
  params: any,
  accounts: Set<string>
) => Promise<AccountAndBalance[]>;
