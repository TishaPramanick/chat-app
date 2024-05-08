const express = require("express");
const { signUp, uploadPic, upload, login, allUsers } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleWare");

const route = express.Router();

route.post('/sign-up' , signUp);
route.post('/login' , login);
route.post('/upload-pic' , upload.single("pic") ,uploadPic );

route.get('/' , authMiddleware , allUsers);

module.exports = route;