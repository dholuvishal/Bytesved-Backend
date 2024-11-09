import mongoose, { Schema, Document, Types } from "mongoose";

// Define interface for a single experience information record
interface ExperienceInformationRecord {
    companyName: string;
    location: string;
    jobPosition: string;
    periodFrom: Date;
    periodTo: Date; 
}

// Define interface for employee experience information
export interface ExperienceInformationsInterface extends Document {
    user: mongoose.Types.ObjectId;
    experienceInformationRecords: ExperienceInformationRecord[];
}

// Define schema for employee experience information
const experienceInformationSchema: Schema<ExperienceInformationRecord> = new Schema({
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobPosition: { type: String, required: true },
    periodFrom: { type: Date, required: true },
    periodTo: { type: Date, required: true },
});

const experienceInformationsSchema: Schema<ExperienceInformationsInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    experienceInformationRecords: [experienceInformationSchema]
}, { timestamps: true });

// Define model for employee experience information
const ExperienceInformations = mongoose.model<ExperienceInformationsInterface>("ExperienceInformations", experienceInformationsSchema);

export default ExperienceInformations;