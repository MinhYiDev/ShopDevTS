import express, { Request, Response } from "express";
const router = express();
import netModel, { INet } from "~/model/net/net.model";

interface IData {
    netId: number;
    content: string;
}

interface CustomRequest extends Request {
    body: {
        netId: number;
        content: string;
        createdTime: string;
        updateTime: string;
    };
}

router.post("/net", async (req: CustomRequest, res: Response): Promise<Response<INet>> => {
    const data: IData = {
        netId: req.body.netId,
        content: req.body.content,
    };

    const result: INet = (await netModel.create(data)) as INet;

    if (!result) {
        res.status(500).json({
            err: "Err INet",
        });
    }

    return res.status(200).json(result);
});

router.get("/net", async (req, res): Promise<Response<IData>> => {
    const result = await netModel.find({}).lean().exec();

    const timeTitle = result[0].updateTime;

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
        `);
});

router.put("/net/:netId", async (req: CustomRequest, res): Promise<Response<IData>> => {
    const checkNetId = await netModel.findOne({ netId: req.params.netId }).lean();
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

    const result = await netModel.findOneAndUpdate(filter, update, options);

    return res.status(200).json(result);
});

export default router;
