import { github_strategies } from "./github";
import type { GH_STRATEGY_ID } from "./github";
import { Strategy } from "../types";

export type Strategy_ID = GH_STRATEGY_ID;

export const strategies: Record<Strategy_ID, Strategy> = {
  ...github_strategies,
};
