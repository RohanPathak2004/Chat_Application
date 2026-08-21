import express from 'express';
import {signup,login, logout,updateProfile} from "../controller/auth.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.post('/update/profile',protectRoute,updateProfile);
router.get('/check',protectRoute,(req,res)=>res.status(200).json({data:req.user}))

export default router;