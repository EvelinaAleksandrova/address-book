/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface ReminderInterface extends mongoose.Document {
  idntfr: string;
  contact: string;
  date: Date;
  note: string;
  reminder: number;
  isReminderViewed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
