import express, { Express } from 'express';
import handleError from '../middlewares/error.midleware';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import reminderRoutes from './reminder.routes';

const apiVersion = process.env.API_VERSION || 'v1';

const routes = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'MS Reminder is alive!' });
  });

  app.use(`/${apiVersion}`, userRoutes, authRoutes, reminderRoutes);

  app.use(handleError);
};

export default routes;
