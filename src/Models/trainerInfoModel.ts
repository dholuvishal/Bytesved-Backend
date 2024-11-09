import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS, Status, ROLES, RoleType } from '../Config/constant';
import { required } from "joi";

export interface TrainerInterface extends Document {
    user: Types.ObjectId;
    firstName: string;
    lastName: string;
    role: RoleType;
    email: string;
    mobileNo: string;
    status: Status;
    description: string;
}

const trainerSchema: Schema<TrainerInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }, 
    role: { type: String, enum: Object.values(ROLES), required:true }, 
    email: { type: String, ref: "Employee", required: true },
    mobileNo: { type: String, required: true },  
    status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE },
    description: { type: String, required: true }, 
  },
  {
    timestamps: true,
  }
);

const TrainerInfo = mongoose.model<TrainerInterface>("TrainerInformations", trainerSchema);

export default TrainerInfo;








