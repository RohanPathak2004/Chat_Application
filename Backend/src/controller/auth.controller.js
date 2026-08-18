import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import {generateToken} from "../utils/utils.js";

export const signup = async (req, res) =>{
    const {fullName, email, password} = req.body;

    // console.log("user details",fullName,email);

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({
                'success':false,
                'message':'All the fields are required'
            })
        }
        if(password.length <6) return res.status(400).json({
            'success':false,
            'message':'Password must be at least 6 characters'
        })
        const emailRegex = /^\S+@\S+\.\S+$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({
                'success':false,
                'message':'Invalid email address'
            })
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({
            'success':false,
            'message':'User with this email already exists'
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                'success':true,
                'message':'User successfully created',
                data:{
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                }
            })
        }else {
            res.status(400).json({
                'success':false,
                'message':'Invalid User Data'
            })
        }
    }catch(err) {
     console.log(err);
     res.status(500).json({
         'status':false,
         'message':"Something went wrong"
     })
    }
}