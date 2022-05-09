import {
  Balances,
  StrategyComputation,
  StrategyID,
} from '@dao-strategies/core';
import { Campaign, Prisma } from '@prisma/client';

import { CampaignRepository } from '../repositories/campaignRepository';
import { campaignToUriDetails, CampaignUriDetails } from './CampaignUri';

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

export class CampaignService {
  constructor(
    protected campaignRepo: CampaignRepository,
    protected strategyComputation: StrategyComputation
  ) {}

  /** A campaign is considered created once its smart contract is deployed. This endpoint
   * informs the oracle node about the existence of such a campaign. Once registered
   * the oracle will execute the campaign at the execution time (if in the future) and
   * set the merkleRoot after the grace period */
  async register(newCampaign: Prisma.CampaignCreateInput) {
    await this.campaignRepo.create(newCampaign);
  }

  /** This endpoint "executes" a campaign, immediately running its strategy, and settings its
   * rewards. This method is expected to be called only once per campaign at exactly the executionDate.
   */
  async execute(uri: string): Promise<void> {
    const campaign = await this.campaignRepo.get(uri);

    const params = JSON.parse(campaign.stratParamsStr);
    const rewards = await this.strategyComputation.runStrategy(
      campaign.stratID as StrategyID,
      params
    );
  }

  async simulate(strategyId: StrategyID, strategyParams: any) {
    const rewards = await this.strategyComputation.runStrategy(
      strategyId,
      strategyParams
    );

    return rewards;
  }

  async get(uri: string): Promise<Campaign | undefined> {
    return this.campaignRepo.get(uri);
  }

  async validateOrGetDetails(
    uri: string,
    details?: CampaignUriDetails
  ): Promise<CampaignUriDetails> {
    let validDatails: CampaignUriDetails;

    if (details === undefined) {
      const readCampaign = await this.get(uri);
      if (readCampaign === undefined) {
        throw new Error(`details not provided nor found for campaiagn ${uri}`);
      }
      validDatails = campaignToUriDetails(readCampaign);
    } else {
      validDatails = details;
    }

    return validDatails;
  }

  async getLastSimDate(uri: string): Promise<number | undefined> {
    return this.campaignRepo.getLastSimDate(uri);
  }

  async getRewards(uri: string): Promise<Balances> {
    return this.campaignRepo.getRewards(uri);
  }

  async setRewards(uri: string, rewards: Balances): Promise<void> {
    return this.campaignRepo.setRewards(uri, rewards);
  }
}
