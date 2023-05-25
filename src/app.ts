import express, { Application } from 'express';
import 'dotenv/config'

import  {
  workflowRouter
} from './controllers';

const app: Application = express();

const requestHeaders = (_: express.Request, response: express.Response, next: express.NextFunction) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

const toUse = [
  express.json(),
  requestHeaders
]

toUse.forEach(object => app.use(object));
app.use("/workflows", workflowRouter);

export default app;