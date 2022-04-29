import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Campaign } from "./Campaign";
import { User } from "./User";

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rewards)
  user: User;

  @ManyToOne(() => Campaign, (campaign) => campaign.rewards)
  campaign: Campaign;
}
