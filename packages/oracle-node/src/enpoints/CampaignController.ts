import { NextFunction, Request, Response } from 'express';
import { Balances, balancesToObject, StrategyID } from '@dao-strategies/core';

import { Controller } from './Controller';
import { Services } from '../types';
import { oracleLogger } from '..';
import { CampaignUriDetails, getCampaignUri } from '../services/CampaignUri';
import { CampaignService } from '../services/CampaignService';
import { notEqual } from 'assert';
import { resimulationPeriod } from '../config';

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

  /** */
  async simulate(request: Request, response: Response, next: NextFunction) {
    /** Build the candidate CampaignUri */
    const details: CampaignUriDetails = {
      creator: request.user,
      nonce: 0,
      execData: request.body.execData,
      strategyID: request.body.strategyID,
      strategyParams: request.body.strategyParams,
    };

    const uri = await getCampaignUri(details);
    const rewards = await this.computeRewards(uri, details);
    /** */
    oracleLogger.info('rewards: ', { size: rewards.size });
    return balancesToObject(rewards);
  }

  /**
   * A "cached" execution of a campaign from its URI.
   *
   * A retroactive campaign is executed only once, since it's result
   * is not expected to depend on the execution date. Once executed,
   * a retroactive campaign is never re-executed.
   *
   * An open campaign (non-retroactive) is also expected to be executed
   * only once and in a future date, but it can be "simulated" many times
   * before then.
   *
   * If a campaign was recently simulated, it is not executed again,
   * instead the last-computed simulated rewards are read from the DB and
   * returned.
   *
   * */
  async computeRewards(uri: string, details?: CampaignUriDetails) {
    /** check if this campaign was recently simulated */
    const simDate = await this.services.campaign.getLastSimDate(uri);

    let rewards: Balances;

    if (
      simDate !== undefined &&
      this.services.time.getTime() - simDate > resimulationPeriod
    ) {
      rewards = await this.services.campaign.getRewards(uri);
    } else {
      const validDetails = await this.services.campaign.validateOrGetDetails(
        uri,
        details
      );

      rewards = await this.services.campaign.simulate(
        validDetails.strategyID,
        validDetails.strategyParams
      );

      await this.services.campaign.setRewards(uri, rewards);
    }

    return rewards;
  }
}
