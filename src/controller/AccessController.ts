import { Request, Response } from "express";
import { SuccessResponse } from "~/core/success.response";
import AccessService from "~/services/Access.service";

interface IData {
    name?: string;
    email: string;
    password: string;
}

abstract class AccessController {
    public static async login(req: Request, res: Response) {
        const data: IData = {
            email: req.body.email,
            password: req.body.password,
        };

        return new SuccessResponse({
            statusCode: 200,
            message: "Login SuccessFully",
            metaData: await AccessService.login(data),
        }).send(res);
    }

    public static async register(req: Request, res: Response) {
        const data: IData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        return new SuccessResponse({
            statusCode: 201,
            message: "Register SuccessFully",
            metaData: await AccessService.register(data),
        }).send(res);
    }
}

export default AccessController;
