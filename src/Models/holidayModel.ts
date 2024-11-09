import mongoose, { Schema, Document, Types } from "mongoose";

export interface HolidayInterface extends Document {
    holidayName: string;
    holidayDate: Date;
    day: string;
}

const holidaySchema: Schema<HolidayInterface> = new Schema(
  {
    holidayName: { type: String, required: true },
    holidayDate: { type: Date, required: true }, 
    day: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const HolidayInfo = mongoose.model<HolidayInterface>("HolidayInformations", holidaySchema);

export default HolidayInfo;








