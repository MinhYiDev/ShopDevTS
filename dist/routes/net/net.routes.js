"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const net_model_1 = __importDefault(require("../../model/net/net.model"));
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
router.get("/net", async (req, res) => {
    const result = await net_model_1.default.find({}).lean().exec();
    if (result.length === 0) {
        return res.status(404).json({
            code: 404,
            msg: "Not Found",
        });
    }
    const timeTitle = (0, moment_timezone_1.default)(result[0].updatedAt).format("DD/MM/YYYY HH:mm:ss");
    return res.status(200).send(`
        <style>
            body {
                font-size:2rem;
                width:1170px;
                max-width:calc(100% - 48px);
                margin:0 auto;
            }
            div {
                display:flex;
                flex-direction:column;
                flex-wrap:wrap;
                width:min(1170px,100%);
            }
            h4 {
                color:red;
            }

            p {
                width: 100%;
                word-wrap: break-word;
                margin: 0 auto 10px;
                // background: #eeeded;
            }


            .box_p+ {
                width:100%;
            }

            p::selection {
                background:#796ddf;
                color:#fff;
            }
        </style>
        <!DOCTYPE html>
        <html>
        <head>
            <title>❤️❤️❤️</title>
            <link rel="icon" type="image/png" href="./favicon/favicon-32x32.png">
        <link 
        </head>
        <body>
        <div>
            <h4>
               <span>Cập Nhật Lúc:😄${timeTitle}</span>
               <span>
               </span>
               <div>by P_SANG😊</div>
            </h4>
            
            <div class="box_p+">
                ${result
        .map((item) => {
        return `<p>${item.content}</p>`;
    })
        .join(" ")}
            </div>
       </div>
        </body>
        </html>
        `);
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
