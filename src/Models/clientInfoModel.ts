import mongoose, { Schema, Document, Types } from "mongoose";

export interface ClientInfoInterface extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobileNO?: string;
    country: string;
    review?: number;
}

const clientInfoSchema: Schema<ClientInfoInterface> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required:true },
    email: { type: String, required:true },
    mobileNO: { type: String },
    country: { type: String, required:true },
    review: { type: Number }
  },
  {
    timestamps: true,
  }
);

const ClientInformation = mongoose.model<ClientInfoInterface>("ClientInformations", clientInfoSchema);

export default ClientInformation;