import { Document } from "mongoose";

export interface InsuranceTypeInterface extends Document {
  code: string;
  label: string;
  adminId: string;
  insuranceType: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
