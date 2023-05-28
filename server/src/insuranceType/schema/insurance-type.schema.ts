import * as mongoose from 'mongoose';
import { InsuranceTypeInterface } from '../interface/insurance-type.interface';

export const InsuranceTypeSchema = new mongoose.Schema<InsuranceTypeInterface>(
  {
    code: String,
    label: String,
    adminId: String,
    createdBy: String,
    insuranceType: String
  },
  {
    timestamps: true
  }
);
