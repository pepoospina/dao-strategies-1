import { strategies } from '../strategies';
import type { Strategy_ID } from '../strategies';
import { World, WorldConfig } from '../world/World';

export class StrategyComputation {
  protected world: World;

  constructor(config: WorldConfig) {
    this.world = new World(config);
  }

  async runStrategy(strategyId: Strategy_ID, params: any) {
    const rewards = await strategies[strategyId](this.world, params);
  }
}
