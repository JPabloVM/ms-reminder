import { Date, Schema } from 'mongoose';
import { dbserver } from '../libs/db.connect';

export enum EStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PROGRESS = 'PROGRESS',
  SENDED = 'SENDED',
  ERROR = 'ERROR',
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
  email?: string;
  phoneNumber?: number;
  schedule: Date;
  eventDate: Date;
  payload?: any;
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
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    schedule: {
      type: Date,
      required: true,
    },
    payload: {},
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
