import mongoose, { Schema, Document } from "mongoose";

interface BreakRecord {
    breakIn?: Date;
    breakOut?: Date;
}

export interface BreakInfoInterface extends Document {
    user: mongoose.Types.ObjectId; 
    presentDate?: Date;
    breakRecords: BreakRecord[];
}

const breakRecordSchema: Schema<BreakRecord> = new Schema({
    breakIn: { type: Date },
    breakOut: { type: Date },
});

const breakInfoSchema: Schema<BreakInfoInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    presentDate: { type: Date },
    breakRecords: [breakRecordSchema]
}, { timestamps: true });

const BreakInfo = mongoose.model<BreakInfoInterface>("BreakInformations", breakInfoSchema);

export default BreakInfo;
