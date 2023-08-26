import { createExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';
import dotenv from 'dotenv';
// import log4js from 'log4js';

dotenv.config();
// const logger = log4js.getLogger();
// logger.level = process.env.LOG_LEVEL;
// logger.info('Info log for example');
const port = process.env.PORT;
const app = createExpressServer({
  controllers: [UserController], // we specify controllers we want to use
});
app.listen(port, () => console.log(`Running on port ${port}`));