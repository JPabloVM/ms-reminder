import express from 'express';
import { ReminderController } from '../controllers/reminder.controller';
import { authenticate } from '../middlewares/auth.midleware';

const reminderRoutes = express.Router();

const reminderControler = new ReminderController();

reminderRoutes.post('/reminders', authenticate, reminderControler.create);

reminderRoutes.get('/reminders', authenticate, reminderControler.get);

reminderRoutes.get('/reminders/:id', authenticate, reminderControler.getById);

reminderRoutes.patch('/reminders/:id', authenticate, reminderControler.update);

reminderRoutes.delete('/reminders/:id', authenticate, reminderControler.delete);

export default reminderRoutes;
