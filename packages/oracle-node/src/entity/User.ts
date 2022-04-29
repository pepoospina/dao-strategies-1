import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Reward } from "./Reward";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  rewardsAddress: string;

  @OneToMany(() => Reward, (reward) => reward.campaign)
  rewards: Reward[];
}
