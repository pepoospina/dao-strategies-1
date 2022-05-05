import { strategies } from '~~/customStrategies';
import { StrategyID } from '~~/customStrategies/list';
import { Balances } from '~~/types';
import { World, WorldConfig } from '~~/world/World';

export class StrategyComputation {
  protected world: World;

  constructor(config: WorldConfig) {
    this.world = new World(config);
  }

  async runStrategy(strategyId: StrategyID, params: any): Promise<Balances> {
    const eligibleAccounts = await strategies[strategyId].gate(
      this.world,
      params
    );

    const rewards = await strategies[strategyId].strategy(
      this.world,
      params,
      eligibleAccounts
    );

    let validRewards: Balances = new Map();

    if (eligibleAccounts !== undefined) {
      // filter rewards for only eligible accounts
      rewards.forEach((balance, account) => {
        if (eligibleAccounts.has(account)) {
          validRewards.set(account, balance);
        }
      });
    } else {
      /** overwrite valid rewards with the original rewards Balances */
      validRewards = rewards;
    }

    console.log({ validRewards });

    return validRewards;
  }
}
