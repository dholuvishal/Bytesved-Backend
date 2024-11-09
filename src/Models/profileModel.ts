import mongoose, { Schema, Document, Types } from "mongoose";

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export interface ProfileInterface extends Document {
    user: Types.ObjectId;
    image: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNumber: string;
    department: string;
    designation: string;
    reportsTo: string;
}

const profileSchema: Schema<ProfileInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    image: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true, validate: /^[0-9]{10}$/ },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    reportsTo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const Profile = mongoose.model<ProfileInterface>("Profiles", profileSchema);

export default Profile;