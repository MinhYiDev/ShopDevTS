"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const Access_service_1 = __importDefault(require("../services/Access.service"));
class AccessController {
    static async login(req, res) {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };
        return new success_response_1.SuccessResponse({
            statusCode: 200,
            message: "Login SuccessFully",
            metaData: await Access_service_1.default.login(data),
        }).send(res);
    }
    static async register(req, res) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        return new success_response_1.SuccessResponse({
            statusCode: 201,
            message: "Register SuccessFully",
            metaData: await Access_service_1.default.register(data),
        }).send(res);
    }
}
exports.default = AccessController;
