/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { ContactInterface } from '../interface/contact.interface';

export const ContactSchema = new mongoose.Schema<ContactInterface>(
  {
    idntfr: String,
    company: String,
    department: String,
    name: String,
    phone: String,
    email: String,
    note: String,
    address: String,
    category: String,
  },
  {
    timestamps: true,
  },
);
