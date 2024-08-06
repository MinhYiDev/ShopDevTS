"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = __importDefault(require("process"));
require("dotenv/config");
class Database {
    stringConnect = process_1.default.env.STRING_CONNECT;
    static instance;
    constructor() {
        this.connect();
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.stringConnect);
            console.log("SUCCESS DATABASE");
        }
        catch (error) {
            console.log("ERROR DATABASE");
        }
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceDB = Database.getInstance();
exports.default = instanceDB;
