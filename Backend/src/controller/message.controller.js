import cloudinary from '../lib/cloudinary.js';
import Message from '../models/Message.js';
import User from '../models/User.js';



export const getAllContacts = async(req,res)=>{

    try
    {

        const loggedInUserId = req.user._id;

        if(!loggedInUserId) return res.status(403).json({message:message});

        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // all the contacts accept itsefl.
        res.status(200).json(filteredUser);

    }catch(err)
    {
        console.log("Error in getAllContacts controller",err.message);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

export const getMessageByUserId = async(req,res)=>{
    try{

        const myId = req.user._id;
        const {id:userToChatId} = req.params;


        
        //messages from both sender and receiver.
        const message = await Message.find({
            $or: [
                {
                    senderId : myId, receiverId: userToChatId
                },{
                    senderId:userToChatId,recieverId:myId
                }
            ]
        });


        return res.status(200).json(message);

    }catch(err)
    {
        console.log("Error in getMessageByUserId Controller",err.message);
        return res.status(500).json({message:"Internal Server Error."})
    }
}

export const sendMessage = async(req,res)=>{

    try{

        const {text,image} = req.body;
        const {id:receiverId} = req.params;

        const senderId = req.user._id;
        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo send message in real-time if user is online - socket.io

        res.status(201).json({newMessage});

    }catch(err){

    }

}

export const getChatPartners = async(req,res)=>{
    try{

        //find all the messages which belongs to loggedIn User.

        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:loggedInUserId},{receiverId:loggedInUserId}
            ]
        });

        //get all the unique chat partners.
        const chatPartnerIds = new Set(messages.map(msg=>
            (msg.senderId.toString() === loggedInUserId.toString()) ?
             msg.receiverId.toString() :msg.senderId.toString() ));

        const chatPartnerIdsArray = [...chatPartnerIds];

        const chatPartners = await User.find({_id: {$in:chatPartnerIdsArray}}).select("-password");

        return res.status(200).json(chatPartners);

    }catch(err){

        console.log("Error in getChatPartners controller",err.message);
        return res.status(500).json("Internal server error");

    }
}