import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { ReminderService } from '../services/reminder.service';

import { createReminderSchema, updateReminderSchema } from '../schemas/reminder.schema';

import ValidationError from '../errors/validation.error';
import { Logger } from '../config/logger.config';
import BadRequestError from '../errors/badRequest.error';

const logger = new Logger('ReminderController');
const reminderService = new ReminderService();

export class ReminderController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reminderData = req.body;

      const { error } = createReminderSchema.validate(reminderData);

      if (error) {
        throw new ValidationError(error);
      }

      const created = await reminderService.create(reminderData);
      res.status(201).json({ data: created });
    } catch (error) {
      logger.error(`create error: ${error}`);
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const reminders = await reminderService.get();

      res.status(200).json({ data: reminders });
    } catch (error) {
      logger.error(`get error: ${error}`);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const reminder = await reminderService.getById(id);
      res.status(200).json({ data: reminder });
    } catch (error) {
      logger.error(`get by id error: ${error}`);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      let reminderData = req.body;

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const { error } = updateReminderSchema.validate(reminderData);

      if (error) {
        throw new ValidationError(error);
      }

      const updated = await reminderService.update(id, reminderData);

      res.status(200).json({ data: updated });
    } catch (error) {
      logger.error(`update error: ${error}`);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError('Invalid ID');
      }
      const id = new mongoose.Types.ObjectId(req.params.id);

      if (!id) {
        throw new BadRequestError('The following is missing: id');
      }

      const updated = await reminderService.delete(id);

      res.status(200).json({ data: updated });
    } catch (error) {
      logger.error(`delete error: ${error}`);
      next(error);
    }
  }
}
