import { Balances, Strategy, StrategyGate } from "~~/types";
import { World } from "~~/world/World";

interface Params {
  repositories: Array<{ owner: string; repo: string }>;
}

const strategy: Strategy = async (
  world: World,
  params: Params,
  accounts: Set<string>
): Promise<Balances> => {
  const prs = world.github.rest.pulls.list(params.repositories[0]);
  console.log({ prs });
  return new Map();
};

const gate: StrategyGate = async (world: World, params: Params) => {
  return new Set([]);
};

export type { Params };
export { strategy, gate };
