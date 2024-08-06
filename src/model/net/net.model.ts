import { Schema, model } from "mongoose";
import { createdTime, updateTime } from "~/utils/time";

export interface INet {
    content: string;
    netId: number;
    createdTime?: string;
    updateTime?: string;
}

const netSchema = new Schema<INet>({
    netId: { type: Number, unique: true },
    content: { type: String, required: true },
    createdTime,
    updateTime,
});

export default model<INet>("NetModel", netSchema);
