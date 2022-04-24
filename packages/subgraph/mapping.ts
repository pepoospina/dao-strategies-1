import { BigInt, Address } from "@graphprotocol/graph-ts";
import { CampaignCreated } from "./generated/CampaignFactory/CampaignFactory";
import { Campaign } from "./generated/schema";

export function handleCampaignCreated(event: CampaignCreated): void {
  let campaign = new Campaign(
    event.params.owner.toHex() + event.params.salt.toHex()
  );

  campaign.owner = event.params.owner;
  campaign.strategyHash = event.params.strategyHash;
  campaign.merkleRoot = event.params.merkleRoot;
  campaign.totalSupply = event.params.totalSupply;
  campaign.assetAddress = event.params.assetAddress;

  campaign.save();
}
