import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.router.js';
dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("api/message",messageRoutes);

app.get("/health",(req,res)=>{res.status(200).json("UP")})

app.listen(PORT,()=>{
    console.log("server is running on port and it should work now and run it.",PORT);
});
