import mongoose, { Schema, Document } from "mongoose";
import { STATUS, Status, CHARGETYPE, ChargeType, PRIORITY, priority } from '../Config/constant';

export interface ProjectInfoInterface extends Document {
    projectName: string;
    client: string;
    startDate: Date;
    endDate: Date;
    priority: priority;
    projectLeader: string;
    team: string[];
    description: string;
    uploadFile?: string;
    status?: Status;
    rate: RateInfo;
}

export interface RateInfo {
    charge: number;
    type: ChargeType;
}

const projectInfoSchema = new Schema({
    projectName: { type: String, required: true },
    client: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    priority: { type: String, enum: Object.values(PRIORITY), required: true },
    projectLeader: { type: String, required: true },
    team: { type: [String], required: true },
    description: { type: String, required: true },
    uploadFile: { type: String },
    status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE },
    rate: {
        charge: { type: Number, required: true },
        type: { type: String, enum: Object.values(CHARGETYPE), required: true }
    }
}, { timestamps: true });

const ProjectInformation = mongoose.model<ProjectInfoInterface>("ProjectInformations", projectInfoSchema);

export default ProjectInformation;