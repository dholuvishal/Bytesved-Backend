import mongoose, { Schema, Document, Types } from "mongoose";

export enum MaritalStatus {
    SINGLE = "Single",
    MARRIED = "Married",
}

export interface PersonalInformationInterface extends Document {
    user: Types.ObjectId;
    passportNo: string;
    passportExpiryDate: Date;
    telephoneNo: string;
    nationality: string;
    religion: string;
    maritalStatus: MaritalStatus;
    employmentOfSpouse: string;
    no_ofChildren: number;
}

const personalInformationSchema: Schema<PersonalInformationInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    passportNo: { type: String, required: false },
    passportExpiryDate: { type: Date, required: false },
    telephoneNo: { type: String, required: false },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    maritalStatus: { type: String, enum: Object.values(MaritalStatus), required: true },
    employmentOfSpouse: { type: String, required: false },
    no_ofChildren: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);


const PersonalInformation = mongoose.model<PersonalInformationInterface>("PersonalInformations", personalInformationSchema);

export default PersonalInformation;