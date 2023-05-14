/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface ProductInterface extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
