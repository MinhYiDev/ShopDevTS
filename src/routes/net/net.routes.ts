import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
const app = express();
const router = express.Router();
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

app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());

router.get("/", async (req, res): Promise<Response<INet>> => {
    const findNet = (await netModel.find({}).lean()) as INet[];

    if (findNet.length === 0) {
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

router.post("/net", async (req: CustomRequest, res: Response): Promise<Response<INet>> => {
    const netId = await netModel.findOne({ netId: req.body.netId }).lean().exec();

    if (netId) {
        return res.status(500).json({
            msg: "Trung Id",
        });
    }

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

router.put("/net/:netId", async (req: CustomRequest, res: Response): Promise<Response<IData>> => {
    const filter = { netId: req.params.netId };

    const update = {
        content: req.body.content,
    };

    const result = await netModel.findOneAndUpdate(filter, update);

    return res.status(200).json(result);
});

router.delete("/net/:netId", async (req: Request, res: Response) => {
    const del = await netModel.findOneAndDelete({ netId: req.params.netId }).lean();

    if (del) {
        return res.status(200).json({
            msg: "Delete Sucess " + req.params.netId,
        });
    } else {
        return res.status(400).json({
            msg: "Delete Error " + req.params.netId,
        });
    }
});

export default router;
