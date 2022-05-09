import { CampaignRepository } from '../repositories/campaignRepository';

export class RewardsService {
  constructor(protected campaignRepo: CampaignRepository) {}

  async getLastSimDate(uri: string): Promise<number | undefined> {
    return this.campaignRepo.getLastSimDate(uri);
  }
}
