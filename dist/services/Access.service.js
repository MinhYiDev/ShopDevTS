"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importStar(require("bcrypt"));
const errror_response_1 = require("../core/errror.response");
const shop_model_1 = __importDefault(require("../model/shop.model"));
const randomKey_1 = __importDefault(require("../utils/randomKey"));
const authUtil_1 = __importDefault(require("../auth/authUtil"));
const KeyToken_service_1 = __importDefault(require("./KeyToken.service"));
const PayLoadJwt_1 = __importDefault(require("../utils/PayLoadJwt"));
class AccessService {
    // Login
    static async login({ email, password }) {
        const findShop = await shop_model_1.default.findOne({ email });
        if (!findShop)
            throw new errror_response_1.ErrorResponse(500, "Pls Register was Login");
        const comparePassword = await bcrypt_1.default.compare(password, findShop.password);
        if (!comparePassword)
            throw new errror_response_1.ErrorResponse(500, "Password correct !!!");
        const privateKey = randomKey_1.default.privateKey;
        const publicKey = randomKey_1.default.publicKey;
        const tokens = await authUtil_1.default.createTokenPair({
            payload: (0, PayLoadJwt_1.default)(findShop),
            privateKey,
            publicKey,
        });
        await KeyToken_service_1.default.createKeyToken({
            userId: findShop._id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken,
        });
        return {
            data: findShop,
            tokens,
        };
    }
    // Register
    static async register({ name, email, password }) {
        const checkName = await shop_model_1.default.findOne({ name }).lean();
        const checkEmail = await shop_model_1.default.findOne({ email }).lean();
        if (checkName)
            throw new errror_response_1.ErrorResponse(500, "Name Exist");
        if (checkEmail)
            throw new errror_response_1.ErrorResponse(500, "Email Exist");
        // hashPassword
        const salt = await (0, bcrypt_1.genSalt)(10);
        const hashPassword = bcrypt_1.default.hashSync(password, salt);
        const newShop = await shop_model_1.default.create({ name, email, password: hashPassword });
        if (newShop) {
            const privateKey = randomKey_1.default.privateKey;
            const publicKey = randomKey_1.default.publicKey;
            const { _id, email } = newShop;
            const tokens = await authUtil_1.default.createTokenPair({
                payload: { _id, email },
                privateKey,
                publicKey,
            });
            await KeyToken_service_1.default.createKeyToken({
                userId: newShop._id,
                privateKey,
                publicKey,
                refreshToken: tokens.refreshToken,
            });
            return {
                data: newShop,
                tokens: tokens,
            };
        }
        throw new errror_response_1.ErrorResponse(500, "ERR Register");
    }
}
exports.default = AccessService;
