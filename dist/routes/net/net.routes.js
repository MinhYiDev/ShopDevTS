"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const net_model_1 = __importDefault(require("../../model/net/net.model"));
router.post("/net", async (req, res) => {
    const data = {
        netId: req.body.netId,
        content: req.body.content,
    };
    const result = (await net_model_1.default.create(data));
    if (!result) {
        res.status(500).json({
            err: "Err INet",
        });
    }
    return res.status(200).json(result);
});
router.get("/net", async (req, res) => {
    const result = await net_model_1.default.findOne({ netId: 1 }).lean();
    return res.status(200).send(`${result?.updateTime}\n ${result?.content}`);
});
router.put("/net/:netId", async (req, res) => {
    const checkNetId = await net_model_1.default.findOne({ netId: req.params.netId }).lean();
    if (!checkNetId) {
        res.status(500).json({
            msg: "netId",
        });
    }
    const filter = { netId: req.params.netId };
    const update = {
        content: req.body.content,
    };
    const options = {
        new: true,
        upsert: true,
    };
    const result = await net_model_1.default.findOneAndUpdate(filter, update, options);
    return res.status(200).json(result);
});
exports.default = router;
