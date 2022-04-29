import { NextFunction, Request, Response } from "express";
import { StrategyComputation } from "@dao-strategies/core";

import { worldConfig } from "./../config";

export class CampaignController {
  async execute(request: Request, response: Response, next: NextFunction) {
    const strategyComputation = new StrategyComputation(worldConfig);
  }
}
