import { string } from "joi";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface SalaryInfoInterface extends Document {
    user: Types.ObjectId;
    employeeId: string;
    salary: number;
    PF?: number;
    TDS?: number;
    bonus?: number;
}

const salaryInfoSchema: Schema<SalaryInfoInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    employeeId: { type: String, required: true },
    salary: { type: Number, required: true },
    PF: { type: Number, default:0 },
    TDS: { type: Number, default:0 },
    bonus: { type: Number, default:0 },
},
  {
    timestamps: true,
  }
);

const SalaryInformation = mongoose.model<SalaryInfoInterface>("SalaryInformations", salaryInfoSchema);

export default SalaryInformation;