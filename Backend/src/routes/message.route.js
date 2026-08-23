import express from 'express';
import { getAllContacts } from "../controller/message.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get("/contacts",protectRoute,getAllContacts);
// router.get("/chats",getChatPartners);
// router.get("/:id",getMessageByUserId);

export default router;