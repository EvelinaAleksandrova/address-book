/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface ReminderInterface extends mongoose.Document {
  idntfr: string;
  contact: string;
  date: Date;
  time: string;
  note: string;
  reminder: number;
  isEventViewed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
