import Joi from 'joi';
import { EChannel, EStatus } from '../models/reminder.model';

export const createReminderSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(EStatus))
    .default(EStatus.DRAFT),
  title: Joi.string().required(),
  message: Joi.string().required(),
  channel: Joi.string()
    .valid(...Object.values(EChannel))
    .required(),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': '"date" must be in the format YYYY-MM-DD',
    }),

  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': '"time" must be in the format HH:mm',
    }),
});

export const updateReminderSchema = Joi.object({
  status: Joi.string().valid(...Object.values(EStatus)),
  title: Joi.string(),
  message: Joi.string(),
  channel: Joi.string().valid(...Object.values(EChannel)),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': '"date" must be in the format YYYY-MM-DD',
    }),

  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .messages({
      'string.pattern.base': '"time" must be in the format HH:mm',
    }),
  deletedAt: Joi.date().allow(null),
}).min(1);
