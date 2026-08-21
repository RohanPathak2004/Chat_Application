import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.router.js';
import {connectDB} from "./lib/db.js";
dotenv.config();
import {ENV} from './lib/env.js'
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser()); 

const PORT = ENV.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("api/message",messageRoutes);
app.get("/health",(req,res)=>{res.status(200).json("UP")})

app.listen(PORT,()=>{
    console.log("server is running on port and it should work now and run it.",PORT);
    connectDB();
});
