import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS, Status } from '../Config/constant';

export interface TraineeInterface extends Document {
    user: Types.ObjectId;
    trainingType: string;
    trainer: string;
    startDate: Date;
    endDate: Date;
    description: string;
    status: Status;
}

const traineeSchema: Schema<TraineeInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    trainingType: { type: String, required: true },
    trainer: { type: String, required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true }, 
    status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE }
  },
  {
    timestamps: true,
  }
);

const TraineeInfo = mongoose.model<TraineeInterface>("TraineeInformations", traineeSchema);

export default TraineeInfo;








