import express, { Request, Response } from "express";
import CheckAuth from "~/auth/checkAuth";
const router = express.Router();
import netModel, { INet } from "~/model/net/net.model";
import asyncHandller from "~/utils/asyncHandller";

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

router.use(asyncHandller(CheckAuth.ApiKey));

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

    const options = {
        new: true,
        upsert: true,
    };

    const result = await netModel.findOneAndUpdate(filter, update, options);

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
