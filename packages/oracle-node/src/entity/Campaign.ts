import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Reward } from "./Reward";

@Entity()
export class Campaign {
  @PrimaryColumn()
  uri: number;

  @Column()
  executionTime: number;

  @OneToMany(() => Reward, (reward) => reward.campaign)
  rewards: Reward[];
}
