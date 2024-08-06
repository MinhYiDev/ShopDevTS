"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCCUMENT_NAME = "apiKey";
const COLLECTION_NAME = "apiKeys";
const ApiKeyModel = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    premissions: { type: [String], enum: ["0000", "1111", "2222"] },
}, {
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCCUMENT_NAME, ApiKeyModel);
