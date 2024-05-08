const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String,
    },
    pic : {
        type : String
    },
    createdAt : Date,
    updatedAt : Date,
});

testSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
})


testSchema.virtual('fullName').set(function(name){
    let str = name.split(" ");

    this.firstName = str[0];
    this.lastName = str[1];
})

testSchema.methods.setDefaultProfilePic = function(){
    return this.firstName[0] + this.lastName[0];
}

testSchema.statics.getAllUsers = function(){
    return new Promise((res , rej)=>{
        this.find((err , data)=>{
            if(err){
                console.log(err);
                return rej(err);
            }

            res(data);
        })
    })
}


testSchema.pre('save' , function(next){
    this.updatedAt = Date.now();

    if(!this.createdAt)
    {
        this.createdAt = Date.now();
    }

    if(!this.pic)
    {
        this.pic = this.firstName[0] + this.lastName[0];
    }

    next();

});

testSchema.post('save' , function(){
    console.log("Your data save success fully");
})

// testSchema.post('save' , function(){

// })
module.exports = mongoose.model("Test" , testSchema);