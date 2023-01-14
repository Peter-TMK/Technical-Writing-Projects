const jwt = require('jsonwebtoken');
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET_TOKEN, (err, user)=>{
            if(user){
                req.user = user;
                next();
            } else if(err) {
                res.status(403).json("Invalid Token!");
            }
        })

    } else {
        return res.status(401).json("You are not authenticated!")
    }
};

module.exports = {
    verifyToken,
};