"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const access_routes_1 = __importDefault(require("./access/access.routes"));
const net_routes_1 = __importDefault(require("./net/net.routes"));
function routes(app) {
    app.use("/v1/api/shop", access_routes_1.default);
    app.use("/", net_routes_1.default);
}
exports.default = routes;
