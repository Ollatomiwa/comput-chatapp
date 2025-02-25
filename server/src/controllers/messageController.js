import Message from "../models/messageModal.js"
import User from "../models/userModal.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserid = req.user._id;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserid}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSideBar:", error.message);
        res.status(500).json({error: "Server Error"});
    }
};

export const getMessage = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._Id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({error: "Server Error"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure.url;
        }

        const newMessage = new Message ({
            senderId,
            recieverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // realtime functionality coming here > socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        res.status(500).json({error: "Server Error"});
        
    }
};