import { Date, Schema } from 'mongoose';
import { dbserver } from '../libs/db.connect';

export enum EStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  SENDED = 'SENDED',
  CANCELED = 'CANCELED',
}

export enum EChannel {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
}

export interface IReminder {
  _id: Schema.Types.ObjectId;
  status: EStatus;
  title: string;
  message: string;
  channel: EChannel;
  schedule: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    status: {
      type: String,
      enum: Object.values(EStatus),
      default: EStatus.DRAFT,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: Object.values(EChannel),
      required: true,
    },
    schedule: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const ReminderModel = dbserver.model<IReminder>('Reminder', reminderSchema);

export default ReminderModel;
