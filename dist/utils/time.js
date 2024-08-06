"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTime = exports.createdTime = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const timeMoment = moment_timezone_1.default.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");
const createdTime = {
    type: String,
    default: timeMoment,
};
exports.createdTime = createdTime;
const updateTime = {
    type: String,
    default: timeMoment,
};
exports.updateTime = updateTime;
