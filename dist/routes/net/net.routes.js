"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const net_model_1 = __importDefault(require("../../model/net/net.model"));
router.get("/", async (req, res) => {
    const findNet = (await net_model_1.default.find({}).lean());
    if (!findNet) {
        res.status(400).json({
            err: 400,
            msg: "Can't find Net",
        });
    }
    return res.status(200).json({
        code: 200,
        msg: "SUCCESS DATA",
        data: findNet,
    });
});
router.post("/net", async (req, res) => {
    const netId = await net_model_1.default.findOne({ netId: req.body.netId }).lean().exec();
    if (netId) {
        return res.status(500).json({
            msg: "Trung Id",
        });
    }
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
router.put("/net/:netId", async (req, res) => {
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
router.delete("/net/:netId", async (req, res) => {
    const del = await net_model_1.default.findOneAndDelete({ netId: req.params.netId }).lean();
    if (del) {
        return res.status(200).json({
            msg: "Delete Sucess " + req.params.netId,
        });
    }
    else {
        return res.status(400).json({
            msg: "Delete Error " + req.params.netId,
        });
    }
});
exports.default = router;
