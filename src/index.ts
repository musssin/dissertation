import {  useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, {Express} from 'express';
import httpContext from 'express-http-context';
import { GlobalErrorHandler } from './middleware/global-error-handler';
// import log4js from 'log4js';

dotenv.config();
// const logger = log4js.getLogger();
// logger.level = process.env.LOG_LEVEL;
// logger.info('Info log for example');
const port = process.env.PORT;
const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

app.listen(port, () => console.log(`Running on port ${port}`));