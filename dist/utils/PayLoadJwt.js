"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function payloadJWT(obj) {
    const { _id, email } = obj;
    return {
        _id,
        email,
    };
}
exports.default = payloadJWT;
