import dotenv from 'dotenv';
import express from 'express';

const env = process.env.NODE_ENV || 'prod';
const envFile = `.${env}.env`;

dotenv.config({ path: envFile });

import routes from './routes/index.routes';

const app = express();

routes(app);

export default app;
