import mongoose, { Schema, Document, Types } from "mongoose";
import { LEAVESTATUS, LeaveStatus } from "../Config/constant";

interface DateWithDayName {
    halfLeave: any;
    fullLeave: any;
    date: Date;
    dayName: string;
}

export interface LeaveInfoInterface extends Document {
    user: Types.ObjectId;
    from: Date;
    to: Date;
    totalDays: number;
    considerLeave?: number;
    totalDates?: DateWithDayName[]; // Updated to an array of objects
    fullLeave?: boolean;
    halfLeave?: boolean;
    leaveReason: string;
    leaveStatus?: LeaveStatus;
}

const leaveInfoSchema: Schema<LeaveInfoInterface> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        totalDays: { type: Number, required: true },
        considerLeave: { type: Number },
        totalDates: [{ 
            date: { type: Date },
            dayName: { type: String }
        }],
        fullLeave: { type: Boolean, default: false },
        halfLeave: { type: Boolean, default: false },
        leaveReason: { type: String, required: true },
        leaveStatus: { type: String, enum: Object.values(LEAVESTATUS), default: LEAVESTATUS.PENDING },
    },
    {
        timestamps: true,
    }
);

const LeaveInformations = mongoose.model<LeaveInfoInterface>("LeaveInformations", leaveInfoSchema);

export default LeaveInformations;