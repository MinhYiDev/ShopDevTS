import { Schema, model } from "mongoose";

const DOCCUMENT_NAME: string = "Shop";
const COLLECTION_NAME: string = "Shops";

export interface IShop {
    _id?: any;
    name: string;
    email: string;
    password: string;
    status: string;
    role: string | number | undefined[];
    verify: boolean;
}

const shopModel = new Schema<IShop>(
    {
        name: { type: String, required: true, unique: true, maxLength: 150 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, enum: ["active", "inactive"] },
        role: { type: Array, default: [] },
        verify: { type: Boolean, default: false },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export default model<IShop>(DOCCUMENT_NAME, shopModel);
