import mongoose from 'mongoose';
import dotenv from 'dotenv';
export const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected!");
    }catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}