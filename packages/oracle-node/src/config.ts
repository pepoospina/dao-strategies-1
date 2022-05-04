import { WorldConfig } from "@dao-strategies/core";

require("dotenv").config();

export const worldConfig: WorldConfig = {
  GITHUB_TOKEN: "",
};

export const port = process.env.PORT;
