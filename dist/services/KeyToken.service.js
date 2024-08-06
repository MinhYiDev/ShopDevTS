"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keyToken_model_1 = __importDefault(require("../model/keyToken.model"));
class KeyTokenService {
    static createKeyToken({ userId, privateKey, publicKey, refreshToken, refreshTokenUsed = null }) {
        const filter = {
            user: userId,
        };
        const update = {
            privateKey,
            publicKey,
            refreshToken,
            refreshTokenUsed,
        };
        const options = {
            new: true,
            upsert: true,
        };
        return keyToken_model_1.default.findOneAndUpdate(filter, update, options);
    }
}
exports.default = KeyTokenService;
