import { NextFunction, Request, Response } from 'express';
import { StrategyID } from '@dao-strategies/core';

import { Controller } from './Controller';
import { Services } from '../types';
import { logger } from '..';

/**
 * On Retroactive Campaign
 * =======================
 *
 * The rewards must be computed before the campaign
 * contract has been deployed (to include the merkleRoot).
 *
 * (Issue: a hacker can spam the oracle by creating thousands of different
 * campaigns, forcing us to hit the Github API rate-limit)
 *
 * - The frontend will gather the campaign configuration
 * - The frontend will call the `execute` endpoint.
 * - The oracle will compute the rewards (in terms of social ids) and return them.
 * - The frontend will show the rewards, and, if approved, deploy the smart contract.
 */

export class CampaignController extends Controller {
  constructor(services: Services) {
    super(services);
  }
  async simulate(request: Request, response: Response, next: NextFunction) {
    logger.info({ request });
    const rewards = await this.services.campaign.runStrategy(
      request.body.strategyID as StrategyID,
      request.body.strategyParams
    );
  }
}
