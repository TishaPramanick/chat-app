const {customError} = require("../utils/errorHandler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const message = async(req , res , next)=>
{
    try {
        const newMsg = await Message.create({
            sender : "66325f1fadc7ef29c4db6eb6",
            content : "Hi How are you?",
            chat : "6632f6405b36b96249615e7a"
        });

        res.json(newMsg);
    } catch (error) {
        next(error);
    }
}


const accessChat = async(req , res  , next)=>{
    try {
        const {userId} = req.body;

        if(!userId) return next(customError(400 , "UserId not send with request"));

        let isChat = await Chat.find({
            isGroupChat : false,
            $and : [
                {users : {$elemMatch : {$eq : req.user.id}}},
                {users : {$elemMatch : {$eq : userId}}},
            ]
        })
        .populate("latestMessage")
        .populate("users" , "-password")


        
        isChat = await User.populate(isChat , {
            path : "latestMessage.sender",
            select : "name pic email"
         });


        if(isChat.length > 0)
        {
            res.send(isChat);
        }
        else
        {
            var chatData = {
                chatName : "sender",
                isGroupChat : false,
                users : [req.user.id , userId]
            };
            try {
                const createChat = await Chat.create(chatData);

                const FullChat = await Chat.findOne({_id : createChat._id}).populate("users -password");

                res.status(200).send(FullChat);
            } catch (error) {
                next(error);
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {accessChat , message};