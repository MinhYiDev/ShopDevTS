"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUtil {
    static async hanndleRefreshToken(req, res, next) { }
    static async createTokenPair({ payload, privateKey, publicKey }) {
        const [accessToken, refreshToken] = await Promise.all([
            jsonwebtoken_1.default.sign(payload, publicKey, { expiresIn: "2d" }),
            jsonwebtoken_1.default.sign(payload, publicKey, { expiresIn: "7d" }),
        ]);
        jsonwebtoken_1.default.verify(accessToken, publicKey, (err, decode) => {
            if (err)
                console.log("Loi JWT NE: ", err);
            console.log(decode);
        });
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.default = AuthUtil;
