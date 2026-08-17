import express from 'express';

const router = express.Router();

router.get('/signup',(req,res)=>res.send("sign up"));

export default router;