const express = require("express");
const authMiddleware = require("../middleware/authMiddleWare");
const { accessChat , message} = require("../controller/chatContoller");

const route = express.Router();

// route.get('/' , authMiddleware , fetchChats);
route.post('/' , authMiddleware , accessChat);
route.post('/msg' , authMiddleware , message)
// route.post('/group' , authMiddleware , createGroupChat);
// route.put('/rename' , authMiddleware , renameGroup);
// route.put('/group-remove' , authMiddleware , removeFromGroup);
// route.put('/group-add' , authMiddleware , addToGroup);

module.exports = route;