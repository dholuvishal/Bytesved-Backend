import mongoose, { Schema, Document } from "mongoose";

// Define interface for a single education record
interface EducationRecord {
    institution: string;
    subject: string;
    startingDate: Date;
    completeDate: Date;
    degree: string;
    grade: string;
}

// Define interface for employee education information
export interface EducationInfoInterface extends Document {
    user: mongoose.Types.ObjectId; // Assuming mongoose.Types.ObjectId for better type checking
    educationRecords: EducationRecord[];
}

// Define schema for a single education record
const educationRecordSchema: Schema<EducationRecord> = new Schema({
    institution: { type: String, required: true },
    subject: { type: String, required: true },
    startingDate: { type: Date, required: true },
    completeDate: { type: Date, required: true },
    degree: { type: String, required: true },
    grade: { type: String, required: true }
});

// Define schema for employee education information
const educationInfoSchema: Schema<EducationInfoInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true }, // User reference stored once
    educationRecords: [educationRecordSchema] // Array of education records
}, { timestamps: true });

// Define model for employee education information
const EducationInfo = mongoose.model<EducationInfoInterface>("EducationInformations", educationInfoSchema);

export default EducationInfo;








