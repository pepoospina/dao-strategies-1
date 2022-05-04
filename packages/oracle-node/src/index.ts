import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { Request, Response } from 'express';

import { Routes } from './enpoints/routes';
import { port } from './config';
import { Services } from './types';

import { CampaignService } from './services/CampaignService';

function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({ message: err.message });
}

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// create express app
const app = express();

app.use(
  expressWinston.logger({
    transports: logger.transports,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use(bodyParser.json());

// register express routes from defined application routes
Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    async (req: Request, res: Response, next: Function) => {
      try {
        const repos: Services = {
          campaign: new CampaignService(),
        };
        const result = await new (route.controller as any)(repos)[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );
});

// setup express app here
// ...

// start express server
app.use(handleError);
app.listen(port);

console.log(`Express server has started on port ${port}.`);
