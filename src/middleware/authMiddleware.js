const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId).select('-password');
        req.user = user;
        next();
    } catch(error){
        return res.status(401).json({
            message: "Token is invalid or expired"
        });
    }
};

module.exports = authMiddleware;