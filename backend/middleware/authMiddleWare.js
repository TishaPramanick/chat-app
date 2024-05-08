const { verifyToken } = require("../config/jwtToken");

const authMiddleware = (req , res , next)=>{
    const headers = req.headers;

    const authoriztion = headers?.authorization;

    if(!authoriztion) return res.status(401).json({msg : "Unauthorized User!!"});

    const token = authoriztion.split(' ')[1];

    if(!token) return res.status(401).json({msg : "Token Not Found Please Login Again!!"});

    const data = verifyToken(token);
    

    if(!data.success) return res.json({msg : data.message})
    
    req.user = {id : data.id};

    next();
}


module.exports = authMiddleware;