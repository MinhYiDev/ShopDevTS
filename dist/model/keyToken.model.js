"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";
const TokenKeyModel = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Shop",
    },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    refreshTokenUsed: { type: Array, default: [] },
    refreshToken: { type: String, required: true },
}, {
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCCUMENT_NAME, TokenKeyModel);
