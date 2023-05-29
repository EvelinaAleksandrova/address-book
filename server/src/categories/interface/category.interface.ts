/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface CategoryInterface extends Document {
  code: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
}
