import mongoose = require('mongoose');
import { Server } from 'http';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
// main().catch(err => console.log(err));

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    logger.info('database connected');

    app.listen(config.port, () => {
      logger.info(`application app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('fail to connect', error);
  }

  process.on('unhandledRejection', error => {
    errorLogger.error(
      'Unhandled rejection is detected we are closing our server'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');

  if (server) {
    server.close();
  }
});
