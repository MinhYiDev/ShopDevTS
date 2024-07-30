import { Schema, model } from "mongoose";

const DOCCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

export interface IToken {
    user: Schema.Types.ObjectId;
    privateKey: string;
    publicKey: string;
    refreshTokenUsed: string | null[];
    refreshToken: string;
}

const TokenKeyModel = new Schema<IToken>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "Shop",
        },
        privateKey: { type: String, required: true },
        publicKey: { type: String, required: true },
        refreshTokenUsed: { type: Array, default: [] },
        refreshToken: { type: String, required: true },
    },
    {
        collection: COLLECTION_NAME,
    },
);

export default model<IToken>(DOCCUMENT_NAME, TokenKeyModel);
