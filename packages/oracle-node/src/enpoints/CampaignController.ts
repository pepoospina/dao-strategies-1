import { NextFunction, Request, Response } from 'express';
import { balancesToObject, StrategyID } from '@dao-strategies/core';

import { Controller } from './Controller';
import { Services } from '../types';
import { oracleLogger } from '..';

/**
 * On Retroactive Campaign
 * =======================
 *
 * The rewards must be computed before the campaign
 * contract has been deployed (to inform the user).
 *
 * (Issue: a hacker can spam the oracle by creating thousands of different
 * campaigns, forcing us to hit the Github API rate-limit)
 *
 * In any case, this is the flow during campaign creation:
 *
 * - The frontend will gather the campaign configuration
 * - The frontend will call the `simulate` endpoint.
 * - The oracle will compute the rewards (in terms of social ids) and return them.
 * - The frontend will show the rewards, and, if approved, deploy the smart contract and "register" the campaign in the oracle
 * - The oracle will wait for the grace period, execute the strategy, and set the merkle root.
 */

export class CampaignController extends Controller {
  constructor(services: Services) {
    super(services);
  }
  async simulate(request: Request, response: Response, next: NextFunction) {
    oracleLogger.info({ body: request.body });
    const rewards = await this.services.campaign.runStrategy(
      request.body.strategyID as StrategyID,
      request.body.strategyParams
    );
    oracleLogger.info('rewards: ', { size: rewards.size });
    return balancesToObject(rewards);
  }
}
