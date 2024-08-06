"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
