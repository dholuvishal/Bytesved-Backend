import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS, Status } from '../Config/constant';

export interface TrainingInterface extends Document {
    user: Types.ObjectId;
    trainingType: string;
    employees: Types.ObjectId[];
}

const trainingSchema: Schema<TrainingInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    trainingType: { type: String, required: true },
    employees: [{ type: Schema.Types.ObjectId, ref: "Employee", required: true }],
  },
  {
    timestamps: true,
  }
);

const TrainingInfo = mongoose.model<TrainingInterface>("TrainingInformations", trainingSchema);

export default TrainingInfo;








