import { BigNumber } from "ethers";

import { World, WorldConfig } from "./world/World";

export interface AccountAndBalance {
  account: string;
  balance: BigNumber;
}

export type Strategy = (
  world: World,
  params: any
) => Promise<AccountAndBalance[]>;

export type { WorldConfig };