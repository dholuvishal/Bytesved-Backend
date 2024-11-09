import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS, Status } from '../Config/constant';

export interface TrainingTypeInterface extends Document {
    type: string;
    description: string;
    status: Status;
}

const trainingTypeSchema: Schema<TrainingTypeInterface> = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true }, 
    status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE }
  },
  {
    timestamps: true,
  }
);

const TrainingTypeInfo = mongoose.model<TrainingTypeInterface>("TrainingTypeInformations", trainingTypeSchema);

export default TrainingTypeInfo;








