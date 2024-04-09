import mongoose, { Mongoose } from "mongoose";
import dotenv from 'dotenv';
import { injectable } from "inversify";

@injectable()
class MyMongoDB {
    _db!: Mongoose;

    async connect(): Promise<void> {
        dotenv.config();
        this._db = await mongoose.connect(process.env.MONGO_URI!);
    }

    getDb(): Mongoose {
        return this._db;
    }
}

export default MyMongoDB;
