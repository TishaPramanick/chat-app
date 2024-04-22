const express = require('express');
const chatsData = require('./data/data.json');

const app = express();
const PORT = process.env.PORT  || 5000;

app.get('/api/chats' , (req , res )=>{
    res.send(chatsData);
})

app.get('/api/chat/:id' , (req , res)=>{
    console.log(req.params);
    const singleChat = chatsData.filter(c => c._id == req.params.id);
    res.send(singleChat);
})
app.listen(PORT , ()=>{console.log(`Server is listening on PORT ${PORT}`)})