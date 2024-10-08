"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncHandller(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
exports.default = asyncHandller;
