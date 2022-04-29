import { strategies } from "~~/customStrategies";
import { StrategyID } from "~~/customStrategies/list";
import { World, WorldConfig } from "~~/world/World";

export class StrategyComputation {
  protected world: World;

  constructor(config: WorldConfig) {
    this.world = new World(config);
  }

  async runStrategy(strategyId: StrategyID, params: any) {
    const eligibleAccounts = await strategies[strategyId].gate(
      this.world,
      params
    );
    const rewards = await strategies[strategyId].strategy(
      this.world,
      params,
      eligibleAccounts
    );

    const validRewards = rewards.filter((accBalance) =>
      eligibleAccounts.has(accBalance.account)
    );
  }
}
