import express from 'express';
import {signup,login, logout,updateProfile} from "../controller/auth.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcject.middleware.js';


const router = express.Router();

router.use(arcjetProtection);

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.post('/update/profile',updateProfile);
router.get('/check',(req,res)=>res.status(200).json({data:req.user}))

export default router;