"use strict";

class ErrorResponse extends Error {
    public status: number | undefined;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export { ErrorResponse };
