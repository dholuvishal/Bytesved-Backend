import { string } from "joi";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface MonthlySalaryInfoInterface extends Document {
    user: Types.ObjectId;
    month: string;
    year: number;
    employeeId?: string;
    encashment?: number;
    workingDays?: number;
    oneDaySalary?: number;
    paidLeave?: number;
    unPaidLeave?: number;
    paybleSalary?: number;
    paySlipId?: string;
}

const monthlySalaryInfoSchema: Schema<MonthlySalaryInfoInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    employeeId: { type: String },
    encashment: { type: String },
    workingDays: { type: Number },
    oneDaySalary: { type: Number },
    paidLeave: { type: Number },
    unPaidLeave: { type: Number },
    paybleSalary: { type: Number },
    paySlipId: { type: String }
},
  {
    timestamps: true,
  }
);

const MonthlySalaryInformation = mongoose.model<MonthlySalaryInfoInterface>("MonthlySalaryInformations", monthlySalaryInfoSchema);

export default MonthlySalaryInformation;