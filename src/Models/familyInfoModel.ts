import mongoose, { Schema, Document, Types } from "mongoose";

// Define interface for a single family information record
interface FamilyInformationRecord {
    name: string;
    relationship: string;
    birthDate: Date;
    phone?: string; // Optional field
}

// Define interface for employee family information
export interface FamilyInformationsInterface extends Document {
    user: Types.ObjectId; // Use Types.ObjectId from mongoose
    familyInformationRecords: FamilyInformationRecord[];
}

// Define schema for a single family information record
const familyInformationSchema: Schema<FamilyInformationRecord> = new Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phone: { type: String }
});

// Define schema for employee family information
const familyInformationsSchema: Schema<FamilyInformationsInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true }, // Use Schema.Types.ObjectId for user
    familyInformationRecords: [familyInformationSchema] // Array of family information records
}, { timestamps: true });

// Define model for employee family information
const FamilyInfo = mongoose.model<FamilyInformationsInterface>("FamilyInformations", familyInformationsSchema);

export default FamilyInfo;