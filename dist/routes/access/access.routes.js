"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const checkAuth_1 = __importDefault(require("../../auth/checkAuth"));
const AccessController_1 = __importDefault(require("../../controller/AccessController"));
const asyncHandller_1 = __importDefault(require("../../utils/asyncHandller"));
// middleware
router.use((0, asyncHandller_1.default)(checkAuth_1.default.ApiKey));
router.use((0, asyncHandller_1.default)(checkAuth_1.default.checkPre));
// METHOD
router.post("/register", (0, asyncHandller_1.default)(AccessController_1.default.register));
router.post("/login", (0, asyncHandller_1.default)(AccessController_1.default.login));
exports.default = router;
