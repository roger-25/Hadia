import express from 'express';
import { expressApp } from './express-app.js'
import { PORT } from './config/index.js';
import { sequelize } from './database/index.js'
import { ErrorLogger } from './utils/logger.js';

async function StartServer() {

  try{
    const app = express();

    const port = PORT || 3000;

    expressApp(app);

    app.listen(port, async () => {
      console.log(`Server is listening on ${port}`);
      await sequelize.authenticate();
      console.log('Database connected!');
    })
  }
  catch(err) {
    const logger = new ErrorLogger();
    logger.error(err);
  }

}

await StartServer();
