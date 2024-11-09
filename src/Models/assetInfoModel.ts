import mongoose, { Schema, Document } from 'mongoose';
import padNumber from '../Utils/assetIdFunction';
import { ASSETSTATUS, AssetStatus } from '../Config/constant';

export interface AssetInterface extends Document {
    assetName: string;
    assetId: string;
    purchaseDate: Date;
    purchaseFrom: string;
    manufacturer?: string;
    modelName: string;
    serialNumber?: string;
    supplier?: string;
    condition?: string;
    warranty?: string;
    value: number;
    assetUser?: string;
    description?: string;
    status: AssetStatus;
    document?: string;
}

const assetSchema: Schema = new Schema({
    assetName: { type: String, required: true },
    assetId: { type: String, unique: true }, 
    purchaseDate: { type: Date, required: true },
    purchaseFrom: { type: String, required: true },
    manufacturer: { type: String },
    modelName: { type: String, required: true },
    serialNumber: { type: String },
    supplier: { type: String },
    condition: { type: String },
    warranty: { type: String },
    value: { type: Number, required: true },
    assetUser: { type: String },
    description: { type: String },
    status:  { type: String, enum: Object.values(ASSETSTATUS), default: ASSETSTATUS.PENDING },
    document: { type: String },
}, { timestamps: true });

assetSchema.pre<AssetInterface>('save', async function (next) {
    try {
        if (!this.assetId) {
            const count = await AssetInfo.countDocuments({});
            const paddedId = padNumber(count + 1, 4);
            this.assetId = `AST-${paddedId}`;
        }
        next();
    } catch (error:any) {
        console.error(`Error in pre-save hook: ${error}`);
        next(error);
    }
});

const AssetInfo = mongoose.model<AssetInterface>('AssetsInformations', assetSchema);

export default AssetInfo;