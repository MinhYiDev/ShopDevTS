"use strict";

import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "~/core/errror.response";
import apiKeyModel, { IApiKey } from "~/model/apiKey.model";
import crypto from "crypto";

enum HEADERS {
    API_KEY = "x-api-key",
    PRE_KEY = "x-pre-key",
}

interface RequestHEADER extends Request {
    keyStore: IApiKey;
}

abstract class CheckAuth {
    public static async ApiKey(req: RequestHEADER, res: Response, next: NextFunction) {
        const apiKey: string = req.headers[HEADERS.API_KEY] as string;

        // if (!apiKey) throw new ErrorResponse(403, `FORBIDDEN ${HEADERS.API_KEY}`);
        if (!apiKey) throw new ErrorResponse(403, `FORBIDDEN`);

        const keyStore = (await apiKeyModel.findOne({ key: apiKey }).lean()) as IApiKey;
        if (!keyStore) throw new ErrorResponse(401, "FORBIDDEN API");

        req.keyStore = keyStore;

        return next();
    }

    public static async checkPre(req: RequestHEADER, res: Response, next: NextFunction) {
        const preKey: string = req.headers[HEADERS.PRE_KEY] as string;

        if (!preKey) throw new ErrorResponse(403, `FORBIDDEN ${HEADERS.PRE_KEY}`);

        if (!req.keyStore.premissions.includes(preKey)) {
            return res.status(403).json({
                code: 403,
                msg: "FORBIDDEN PREKEY",
            });
        }
        return next();
    }
}

export default CheckAuth;
