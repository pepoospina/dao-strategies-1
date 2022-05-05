import { BigNumber } from 'ethers';
import { Balances, Strategy, StrategyGate } from '~~/types';
import { World } from '~~/world/World';

interface Params {
  repositories: Array<{ owner: string; repo: string }>;
}

const strategy: Strategy = async (
  world: World,
  params: Params,
  accounts: Set<string> | undefined
): Promise<Balances> => {
  const prs = await world.github.rest.pulls.list(params.repositories[0]);

  const rewards: Balances = new Map();
  prs.data.forEach((pr) => {
    if (pr.user === null) throw new Error('pr user undefined');
    const author = pr.user.login;
    const reward = BigNumber.from(1000);
    rewards.set(author, reward);
  });

  return rewards;
};

const gate: StrategyGate = async (world: World, params: Params) => {
  return undefined;
};

export type { Params };
export { strategy, gate };
