import mongoose, { Schema, Document, Types } from "mongoose";

export interface DesignationInfoInterface extends Document {
    departmentId: string;
    designationName: string;
}

const designationInfoSchema: Schema<DesignationInfoInterface> = new Schema(
  {
    departmentId: { type: String, required: true },
    designationName: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const DesignationInformation = mongoose.model<DesignationInfoInterface>("DesignationInformations", designationInfoSchema);

export default DesignationInformation;