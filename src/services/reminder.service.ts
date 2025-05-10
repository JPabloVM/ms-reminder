import mongoose from 'mongoose';
import ReminderModel from '../models/reminder.model';
import { CreateReminderDTO, UpdateReminderDTO } from '../types/reminder.types';

export class ReminderService {
  constructor() {}

  async create(data: CreateReminderDTO) {
    try {
      return await ReminderModel.create({ ...data, schedule: new Date(`${data.date}T${data.time}:00Z`) });
    } catch (error) {
      throw error;
    }
  }

  async get(query?: any) {
    try {
      return await ReminderModel.find({ ...query });
    } catch (error) {
      throw error;
    }
  }

  async getById(id: mongoose.Types.ObjectId) {
    try {
      return await ReminderModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: mongoose.Types.ObjectId, data: UpdateReminderDTO) {
    try {
      return await ReminderModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: mongoose.Types.ObjectId) {
    try {
      return await ReminderModel.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
    } catch (error) {
      throw error;
    }
  }
}
