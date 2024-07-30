import mongoose from "mongoose";
import process from "process";
import "dotenv/config";

class Database {
    private stringConnect: string = process.env.STRING_CONNECT as string;

    public static instance: Database;

    constructor() {
        this.connect();
    }

    private async connect() {
        try {
            await mongoose.connect(this.stringConnect);
            console.log("SUCCESS DATABASE");
        } catch (error) {
            console.log("ERROR DATABASE");
        }
    }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDB: Database = Database.getInstance();

export default instanceDB;
