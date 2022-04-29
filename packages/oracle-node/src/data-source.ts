import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_URL || "localhost",
  port: +process.env.POSTGRES_PORT || 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
