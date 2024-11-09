import mongoose, { Schema, Document, Types } from "mongoose";

export interface DepartmentInfoInterface extends Document {
    departmentName: string;
}

const departmentInfoSchema: Schema<DepartmentInfoInterface> = new Schema(
  {
    departmentName: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const DepartmentInformation = mongoose.model<DepartmentInfoInterface>("DepartmentInformations", departmentInfoSchema);

export default DepartmentInformation;