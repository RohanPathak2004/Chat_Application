import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import { ENV } from '../lib/env.js';

export const protectRoute = async (req, res, next) => {

    try {
        const jwtToken = req.cookies['jwt'];
        // console.log("jwtToken",jwtToken);
        if (!jwtToken){
            return handleUnauthorized("No Token Provided",res);
        }


        const decode = jwt.verify(jwtToken, ENV.JWT_SECRET);


        if (!decode) {
            return handleUnauthorized("Invalid Token",res);
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return handleUnauthorized("User Not Found",res);
        }
        req.user = user;
        // console.log(user._id);
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware", err.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error.'
        });
    }

}

const handleUnauthorized = (message, res) => {
    return res.status(401).json({
        message: `Unauthorized - ${message}`
    });
}