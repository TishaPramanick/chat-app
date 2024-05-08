const express = require('express');
const chatsData = require('./data/data.json');
const dbConnection = require("./config/dbConnection");
const {customError , errorHandler} = require("./utils/errorHandler");

const userRoute = require("./route/userRoute");
const chatRoute = require("./route/chatRoute");
const app = express();
const PORT = process.env.PORT  || 5000;


app.use(express.json()); //content-type : application/json
app.use(express.urlencoded({extended : false})); //application/x-www...

app.get('/api/chats' , (req , res )=>{
    res.send(chatsData);
})

app.get('/api/chat/:id' , (req , res , next)=>{
    console.log(req.params);
    const singleChat = chatsData.filter(c => c._id == req.params.id);
    res.send(singleChat);
});

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute );

app.use(errorHandler);

app.listen(PORT , ()=>{console.log(`Server is listening on PORT ${PORT}`)})