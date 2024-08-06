import mongoose from "mongoose";
import process from "process";
import "dotenv/config";

class Database {
    private stringConnect: string =
        (process.env.STRING_CONNECT as string) ||
        "mongodb+srv://phamhongsang12x10:XY1pow8PztRkhMVc@cluster0.loq8seh.mongodb.net/ShopTypeDev";

    public static instance: Database;

    constructor() {
        this.connect();
    }

    private async connect() {
        try {
            await mongoose.connect(
                "mongodb+srv://phamhongsang12x10:XY1pow8PztRkhMVc@cluster0.loq8seh.mongodb.net/ShopTypeDev",
            );
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
