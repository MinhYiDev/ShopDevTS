"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errror_response_1 = require("../core/errror.response");
const apiKey_model_1 = __importDefault(require("../model/apiKey.model"));
var HEADERS;
(function (HEADERS) {
    HEADERS["API_KEY"] = "x-api-key";
    HEADERS["PRE_KEY"] = "x-pre-key";
})(HEADERS || (HEADERS = {}));
class CheckAuth {
    static async ApiKey(req, res, next) {
        const apiKey = req.headers[HEADERS.API_KEY];
        if (!apiKey)
            throw new errror_response_1.ErrorResponse(403, `FORBIDDEN ${HEADERS.API_KEY}`);
        const keyStore = (await apiKey_model_1.default.findOne({ key: apiKey }).lean());
        if (!keyStore)
            throw new errror_response_1.ErrorResponse(401, "FORBIDDEN API");
        req.keyStore = keyStore;
        return next();
    }
    static async checkPre(req, res, next) {
        const preKey = req.headers[HEADERS.PRE_KEY];
        if (!preKey)
            throw new errror_response_1.ErrorResponse(403, `FORBIDDEN ${HEADERS.PRE_KEY}`);
        if (!req.keyStore.premissions.includes(preKey)) {
            return res.status(403).json({
                code: 403,
                msg: "FORBIDDEN PREKEY",
            });
        }
        return next();
    }
}
exports.default = CheckAuth;
