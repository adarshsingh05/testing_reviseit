const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "no token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log decoded token to confirm structure
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }
        req.userId = decoded.userId; 
        console.log("requserId:",req.userId) // Should be `userId`, not `userID`        
        next();
        
        
    } catch (error) {
        console.log("error verifying the token", error);
        
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }


}
module.exports = verifyToken;