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

    await strategyComp.runStrategy("GH_PRS_REACTIONS_WEIGHED", {
        repositories: [{ owner: "gershido", repo: "test-github-api" }],
        timeRange: { start: 1651746178, end: 1652350978 }
    });
}

runTest();
