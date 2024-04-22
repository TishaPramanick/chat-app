const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    passward : {type : String , required : true},
    pic : {type : String , required : true},
});

module.exports = mongoose.model("User" , userSchema);