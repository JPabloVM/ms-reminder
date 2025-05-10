import mongoose from 'mongoose';
import { Logger } from '../config/logger.config';

const logger = new Logger('MongoDB');

if (!process.env.DATABASE_CONNECTION_URI || !process.env.DATABASE_NAME) {
  throw new Error('Missing environment variables: DATABASE_CONNECTION_URI or DATABASE_NAME');
}

export const dbserver = (() => {
  logger.verbose('connecting to MongoDB');

  const dbs = mongoose.createConnection(process.env.DATABASE_CONNECTION_URI, {
    dbName: process.env.DATABASE_NAME,
    autoIndex: true,
  });

  dbs.on('connected', () => {
    logger.verbose('connected to ' + process.env.DATABASE_CONNECTION_URI);
    logger.info('ON - dbName: ' + dbs.name);
  });

  dbs.on('error', (err) => {
    logger.error('MongoDB connection error: ' + err.message);
  });

  process.on('beforeExit', () => {
    logger.verbose('instance destroyed');
    dbs.close().then(() => logger.verbose('MongoDB connection closed'));
  });

  return dbs;
})();
