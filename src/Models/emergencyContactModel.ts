import mongoose, { Schema, Document, Types } from "mongoose";

// Define interface for a single emergency contact record
interface EmergencyContactRecord {
    name: string;
    relationship: string;
    primaryPhone: string;
    secondaryPhone?: string; 
}

// Define interface for employee emergency contact information
export interface EmergencyContactInterface extends Document {
    user: mongoose.Types.ObjectId;
    emergencyContactRecords: EmergencyContactRecord[];
}

// Define schema for employee emergency contact information
const EmergencyContactSchema: Schema<EmergencyContactRecord> = new Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    secondaryPhone: { type: String } 
});

const emergencyContactSchema: Schema<EmergencyContactInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    emergencyContactRecords: [EmergencyContactSchema]
}, { timestamps: true });

// Define model for employee emergency contact information
const EmergencyContact = mongoose.model<EmergencyContactInterface>("EmergencyContacts", emergencyContactSchema);

export default EmergencyContact;