import mongoose, { Schema, Document, Types } from "mongoose";
import { ATTENDANCE, AttendanceStatus} from '../Config/constant';
import { string } from "joi";

export interface AttendanceInfoInterface extends Document {
    user: Types.ObjectId;
    presentDate?: Date;
    workIn?: Date;
    workOut?: Date;
    breakTimes?: number[];
    workHours?: number;
    totalTimes?: number;
    halfLeave?: Boolean;
    attendance?: AttendanceStatus;
}

const attendanceInfoSchema: Schema<AttendanceInfoInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    presentDate: { type: Date },
    workIn: { type: Date },
    workOut: { type: Date },
    breakTimes: { type: [Number] },
    workHours: { type: Number },
    totalTimes: { type: Number },
    halfLeave: { type: Boolean, default:false },
    attendance: { type: String, enum: Object.values(ATTENDANCE) }
  },
  {
    timestamps: true,
  }
);

const AttendanceInformations = mongoose.model<AttendanceInfoInterface>("AttendanceInformations", attendanceInfoSchema);

export default AttendanceInformations;



