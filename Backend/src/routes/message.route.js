import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {getAllContacts,getMessageByUserId,sendMessage,getChatPartners} from '../controller/message.controller.js'
import { arcjetProtection } from '../middleware/arcject.middleware.js';
const router = express.Router();



//all the middle ware are executed inorder.

router.use(arcjetProtection,protectRoute);

router.get("/contacts",protectRoute,getAllContacts);
 router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessageByUserId);
router.post("/send/:id",protectRoute,sendMessage)


export default router;