import { IReminder } from '../models/reminder.model';

export type CreateReminderDTO = Omit<IReminder, '_id' | 'createdAt' | 'updatedAt' | 'schedule'> & {
  date: string;
  time: string;
};

export type UpdateReminderDTO = Partial<Omit<IReminder, '_id' | 'createdAt' | 'updatedAt' | 'schedule'>> & {
  date?: string;
  time?: string;
};
