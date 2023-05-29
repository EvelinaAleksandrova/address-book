/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { TypeInterface } from '../interface/type.interface';

export const TypeSchema = new mongoose.Schema<TypeInterface>(
  {
    code: String,
    label: String,
  },
  {
    timestamps: true,
  },
);
