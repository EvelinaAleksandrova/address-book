/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface ContactInterface extends mongoose.Document {
  idntfr: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  address: string;
  note: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
