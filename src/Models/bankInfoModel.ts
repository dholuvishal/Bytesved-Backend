import mongoose, { Schema, Document, Types } from "mongoose";

export interface BankInfoInterface extends Document {
    user: Types.ObjectId;
    bankName: string;
    bankAccountNo: string;
    ifscCode: string;
    panNo: string;
}

const bankInfoSchema: Schema<BankInfoInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    bankName: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    ifscCode: { type: String, required: true },
    panNo: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const BankInformation = mongoose.model<BankInfoInterface>("BankInformations", bankInfoSchema);

export default BankInformation;