import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
const app = express();
const router = express.Router();

interface RequestCustom extends Request {
    query: {
        correlationId?: string;
        docid?: string;
        psi?: string;
        cTag?: string;
        altManifestMetadata?: string;
        tempauth?: string[];
    };
}

const provider = "spo"; //hash
const inputFormat = "mp4"; //hash
const cs = "fFNQTw"; //hash
const enhanceAudio = true; //hash
const action = "Access"; //hash
const part = "index"; //hash
const format = "dash"; //hash
const altTranscode = 1; //hash
const useScf = true; //hash
const pretranscode = 0; //hash
const transcodeahead = 0; //hash
const oif = "4kp"; //hash
const pn = "hostApp-OnePlayer-Web"; //hash
router.get("/", (req: RequestCustom, res: Response) => {
    const correlationId: string = req.query.correlationId as string;
    const docid = req.query.docid as string;
    const psi = req.query.psi as string;
    const cTag = req.query.cTag;
    const altManifestMetadata = req.query.altManifestMetadata as string;
    //tempauth decoded
    const strSplit: string = req.query.docid as string;
    const v2 = strSplit.split("?tempauth=");
    const v3 = v2[1].split("&");
    const tempauth = v3[0] as string;

    const str = `https://eastus1-mediap.svc.ms/transform/videomanifest?provider=${provider}&inputFormat=${inputFormat}&cs=${cs}&correlationId=${correlationId}&docid=${docid}&psi=${psi}&enhanceAudio=${enhanceAudio}&cTag=${cTag}&action=${action}&part=${part}&format=${format}&altManifestMetadata=${altManifestMetadata}&altTranscode=${altTranscode}&useScf=${useScf}&pretranscode=${pretranscode}&transcodeahead=${transcodeahead}&oif=${oif}&pn=${pn}&tempauth=${tempauth}`;

    return res.status(200).send(str);
});

export default router;
