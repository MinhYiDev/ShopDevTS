"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const init_mongodb_1 = __importDefault(require("./database/init.mongodb"));
const helmet_1 = __importDefault(require("helmet"));
const PORT = 3055;
// middleware
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// DB
init_mongodb_1.default;
(0, index_routes_1.default)(app);
app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        code: err.status || 500,
        msg: err.message || "Internal Server",
    });
});
