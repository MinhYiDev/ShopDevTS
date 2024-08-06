"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";
const shopModel = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, maxLength: 150 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"] },
    role: { type: Array, default: [] },
    verify: { type: Boolean, default: false },
}, {
    collection: COLLECTION_NAME,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)(DOCCUMENT_NAME, shopModel);
