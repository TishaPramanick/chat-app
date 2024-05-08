const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { customError } = require("../utils/errorHandler");
const path = require("path");
const multer = require("multer");
const {generateToken} = require("../config/jwtToken");

let fname;

const storage = multer.diskStorage({
    destination : function(res , file , cb){
        cb(null , path.join(path.dirname(require.main.filename) , "/public"));
    },
    filename : function(req , file , cb){
        fname = file.originalname;
        cb(null , fname);
    }
})
const upload = multer({storage : storage});


const uploadPic = (req , res)=>{
    if(!req.file) return res.json({name : null});
    res.json({name : fname});
}
// sign up users
const signUp = async(req , res , next)=>{
    console.log(req.body);
    const {name , email , password , pic} = req.body;
    try { 
        console.log(pic);
        if(!name || !email || !password || name == " " || password == " " || email == " " )
        {
            return next(customError(403 , "All Fields are required!!"));
        }
        const existingUser = await User.findOne({email : email});
        if(existingUser){
            return next(customError(403 , "User already exists with this credentials"));
        }

        const newUser = new User();

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password , salt);
        newUser.name = name;
        newUser.email = email;
        newUser.password = hashedPassword;
        if(pic){newUser.pic = pic};

        await newUser.save();

        res.json({success : true , msg : "Sign Up Done Successfully"});
        
    } catch (error) {
        next(error);
    }
}


// login 
const login =  async(req , res , next)=>{
    const {email , password} = req.body;
    console.log(req.body)

    const findUser = await User.findOne({email : email});

    if(!findUser) return next(customError(404 , "User not found! Please register yourself"));

    const comparePassword = bcrypt.compareSync(password , findUser?.password);

    if(!comparePassword) return next(customError(400 , "Invalid Credentials"));

    const token = generateToken(findUser._id);

    const {password : pwd , ...restInfo} = findUser._doc;
    res.json({restInfo , token : token});

 
}

// api/user?search=tisha 
const allUsers = async (req , res , next)=>{
    const keyword = req.query.search ? {
        $or : [
            {name : {$regex : req.query.search , $options : "i"}},
            {email : {$regex : req.query.search , $options : "i"}}
        ]
    } : {};

    const users = await User.find(keyword).find({_id : {$ne : req.user.id}});

    res.json(users);
}

module.exports = {signUp , uploadPic , upload , login , allUsers};