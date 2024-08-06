"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    statusCode;
    message;
    metaData;
    constructor({ statusCode = 200, message = "OK", metaData }) {
        this.statusCode = statusCode;
        this.message = message;
        this.metaData = metaData;
    }
    send(res) {
        return res.status(this.statusCode).json(this);
    }
    getStatus() {
        return this.statusCode;
    }
    getMessage() {
        return this.message;
    }
    getMetaData() {
        return this.metaData;
    }
}
exports.SuccessResponse = SuccessResponse;
