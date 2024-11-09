import mongoose, { Schema, Document, Types } from "mongoose";


export interface LeaveSettingInfoInterface extends Document {
    user: Types.ObjectId;
    quaternaryLeave: number;
    paidLeave: number;
    totalPaidLeave: number;
    encashmentDays: number;
}

const leaveSettingInfoSchema: Schema<LeaveSettingInfoInterface> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
        quaternaryLeave: { type: Number,required: true },
        paidLeave: { type: Number, required:true },
        totalPaidLeave: { type: Number, required:true, default:0 },
        encashmentDays: { type:Number, required:true, default:0 }
    },
    {
        timestamps: true,
    }
);

const LeaveSettingInformations = mongoose.model<LeaveSettingInfoInterface>("LeaveSettingInformations", leaveSettingInfoSchema);

export default LeaveSettingInformations;