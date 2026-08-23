import Message from '../models/Message.js';
import User from '../models/User.js';


export const getAllContacts = async(req,res)=>{

    try
    {

        const loggedInUserId = req.user._id;

        if(!loggedInUserId) return res.status(403).json({message:"Unauthorized User, please Login first."})

        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUser);

    }catch(err)
    {
        console.log("Error in getAllContacts controller",err.message);
        return res.status(500).json({message:"Internal Server Error"});
    }

}