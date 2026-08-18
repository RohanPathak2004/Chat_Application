import jwt from 'jsonwebtoken';
import {ENV} from "../lib/env.js";
export const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},ENV.JWT_SECRET,{
        expiresIn: '2d'
    });

    res.cookie("jwt",token,{
        maxAge:2*60*60*1000,
        httpOnly:true, //prevent XSS attacks: cross-site scripting
        sameSite:"strict", //CSRF attacks
        secure:"false"
    })

    return token;
}

