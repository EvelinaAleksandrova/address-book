/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { ReminderInterface } from '../interface/reminder.interface';

export const ReminderSchema = new mongoose.Schema<ReminderInterface>(
  {
    idntfr: String,
    contact: String,
    reminder: Number,
    isEventViewed: Boolean,
    note: String,
    date: Date,
    time: String,
  },
  {
    timestamps: true,
  },
);
