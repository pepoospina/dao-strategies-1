import { PrismaClient, Prisma, Campaign } from '@prisma/client';

export class CampaignRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async create(campaignDetails: Prisma.CampaignCreateInput) {
    await this.client.campaign.create({
      data: campaignDetails,
    });
  }

  async get(uri: string): Promise<Campaign> {
    return this.client.campaign.findUnique({ where: { uri: uri } });
  }
}
