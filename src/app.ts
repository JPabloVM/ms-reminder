import dotenv from 'dotenv';
import express from 'express';

const env = process.env.NODE_ENV || 'prod';
const envFile = `.${env}.env`;

dotenv.config({ path: envFile });

import routes from './routes/index.routes';
import { ProcessorQueue } from './queues/processor.queue';
import { ManagerQueue } from './queues/manager.queue';
import { ProducerQueue } from './queues/producer.queue';
import sendEmail from './utils/mailer.util';

const app = express();

const producerQueue = new ProducerQueue();
const processorQueue = ProcessorQueue.getInstance();

const managerQueue = ManagerQueue.getInstance();

const queueScheduler = managerQueue.getOrCreateQueue('scheduler');

producerQueue.produceScheduler(queueScheduler, 'init-reminder', {
  pattern: '* * * * *',
});

processorQueue.processScheduler();
processorQueue.processReminder();

routes(app);

export default app;
