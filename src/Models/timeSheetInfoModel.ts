import mongoose, { Schema, Document, Types } from "mongoose";

export interface TimesheetInfoInterface extends Document {
    user: Types.ObjectId;
    project: string;
    date: Date;
    hours: number;
    description: string;
}

const timesheetInfoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    project: { type: String, required: true },
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const TimesheetInformation = mongoose.model<TimesheetInfoInterface>("TimesheetInformations", timesheetInfoSchema);

export default TimesheetInformation;