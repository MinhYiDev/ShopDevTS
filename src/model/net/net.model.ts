import moment from "moment-timezone";
import { Schema, model } from "mongoose";

const tz = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");

export interface INet {
    content: string;
    netId: number;
    createdAt?: Date;
    updatedAt?: Date | string | number;
}

const netSchema = new Schema<INet>(
    {
        netId: { type: Number, unique: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model<INet>("NetModel", netSchema);
