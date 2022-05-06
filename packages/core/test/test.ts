import { AccountAndBalance } from '@dao-strategies/core';
import { StrategyComputation, WorldConfig } from "@dao-strategies/core";

import 'dotenv/config';

async function runTest() {
    let token = process.env.GITHUB_TOKEN;
    if (token == undefined) {
        throw ('Github token not defined');
    }
    console.log("token:", token);

    let config: WorldConfig = { GITHUB_TOKEN: token };
    let strategyComp = new StrategyComputation(config);

    await strategyComp.runStrategy("GH_PRS_REACTIONS_WEIGHED", { repositories: [{ owner: "daostack", repo: "DAOstack-Hackers-Kit" }] });
}

runTest();
