/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface TypeInterface extends Document {
  code: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
}
