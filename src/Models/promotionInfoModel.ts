import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS, Status } from '../Config/constant';

export interface PromotionInterface extends Document {
    user: Types.ObjectId;
    department: string;
    designationFrom: string;
    designationTo: string;
    promotionDate: Date;
}

const promotionSchema: Schema<PromotionInterface> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    department: { type: String, required: true },
    designationFrom: { type: String, required: true }, 
    designationTo: { type: String, required: true },
    promotionDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const PromotionInfo = mongoose.model<PromotionInterface>("PromotionInformations", promotionSchema);

export default PromotionInfo;








