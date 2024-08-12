"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const helmet_1 = __importDefault(require("helmet"));
const access_routes_1 = __importDefault(require("./access/access.routes"));
const net_routes_1 = __importDefault(require("./net/net.routes"));
app.use((0, helmet_1.default)());
function routes(app) {
    app.use("/v1/api/shop", access_routes_1.default);
    app.use("/v1/api/net", net_routes_1.default);
}
exports.default = routes;
