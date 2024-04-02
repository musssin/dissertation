import { useExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import httpContext from 'express-http-context';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import { SegmentationController } from './controller/segmentation-controller';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [SegmentationController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});
// app.locals.blockchain = null;

app.listen(port, () => console.log(`Running on port ${port}`));