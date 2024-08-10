"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const tz = moment_timezone_1.default.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");
const netSchema = new mongoose_1.Schema({
    netId: { type: Number, unique: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("NetModel", netSchema);
