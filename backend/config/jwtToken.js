const jwt = require("jsonwebtoken");
const SECRET_KEY = "CHITCHAT_USERKEY"
const generateToken = (userId)=>{
    return jwt.sign({id : userId} , SECRET_KEY , {expiresIn : "30m"} )
}


const verifyToken = (token)=>{
     const result = jwt.verify(token , SECRET_KEY , (err , data)=>{
        if(err) return err;
        return {...data , success : true}
    });

    return result;
}
module.exports = {generateToken , verifyToken};