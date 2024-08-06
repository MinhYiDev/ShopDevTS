"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const time_1 = require("../../utils/time");
const netSchema = new mongoose_1.Schema({
    netId: { type: Number, unique: true },
    content: { type: String, required: true },
    createdTime: time_1.createdTime,
    updateTime: time_1.updateTime,
});
exports.default = (0, mongoose_1.model)("NetModel", netSchema);
