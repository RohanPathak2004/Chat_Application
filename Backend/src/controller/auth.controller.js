import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import jwt from "jsonwebtoken";
import cloudinary from '../lib/cloudinary.js'
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    // console.log("user details",fullName,email);

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                'success': false,
                'message': 'All the fields are required'
            })
        }
        if (password.length < 6) return res.status(400).json({
            'success': false,
            'message': 'Password must be at least 6 characters'
        })
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                'success': false,
                'message': 'Invalid email address'
            })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({
            'success': false,
            'message': 'User with this email already exists'
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                'success': true,
                'message': 'User successfully created',
                data: {
                    _id: savedUser._id,
                    fullName: savedUser.fullName,
                    email: savedUser.email,
                    profilePic: savedUser.profilePic,
                }
            })

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (err) {
                console.log("Error in sending welcome email", err);
            }

        } else {
            res.status(400).json({
                'success': false,
                'message': 'Invalid User Data'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'status': false,
            'message': "Something went wrong"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) return res.status(401).json({
            'success': false,
            'message': 'Invalid credentials'
        })
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            'success': false,
            'message': 'Invalid credentials'
        })
        const savedHashedPassword = user.password;
        const verify = await bcrypt.compare(password, savedHashedPassword);
        if (verify) {
            generateToken(user._id, res);
            return res.status(200).json({
                'status': true,
                'message': 'Logged In Successfully.',
                'data': {
                    '_id': user._id,
                    'email': user.email,
                    'fullName': user.fullName,
                    'profilePic': user.profilePic
                }
            })
        } else {
            return res.status(401).json({
                'success': false,
                'message': 'Invalid credentials'
            })
        }
    } catch (e) {
        console.log("Error in Log In",e.message);
        return res.status(500).json({
            'success': false,
            'message': 'Internal Server Error.'
        })
    }

}

export const logout = (_, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        status: true,
        message: 'Logged Out Successfully.'
    })
}


export const updateProfile = async (req,res)=>{
    try{
        const {profilePic} = req.body;
        if(!profilePic) return res.status(400).json({message:"Profile pic is required."});

        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true}).select("-password");

        res.status(200).json(updateUser)

    }catch(e) {
        console.log(e.message);
    }
}