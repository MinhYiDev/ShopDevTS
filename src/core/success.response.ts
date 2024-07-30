import { Response } from "express";

interface ISuccessResponse {
    statusCode: number;
    message: string;
    metaData: any;
}

class SuccessResponse {
    private readonly statusCode: number;
    private readonly message: string;
    private readonly metaData: any;

    public constructor({ statusCode = 200, message = "OK", metaData }: ISuccessResponse) {
        this.statusCode = statusCode;
        this.message = message;
        this.metaData = metaData;
    }

    public send(res: Response) {
        return res.status(this.statusCode).json(this);
    }

    public getStatus(): number {
        return this.statusCode;
    }

    public getMessage(): string {
        return this.message;
    }

    public getMetaData(): any {
        return this.metaData;
    }
}

export { SuccessResponse };
