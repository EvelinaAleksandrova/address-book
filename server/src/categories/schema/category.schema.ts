/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { CategoryInterface } from '../interface/category.interface';

export const CategorySchema = new mongoose.Schema<CategoryInterface>(
  {
    code: String,
    label: String,
  },
  {
    timestamps: true,
  },
);
