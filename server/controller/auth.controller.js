const User  = require('../models/user.model.js');
console.log("user", User)
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const  generateTokenAndSetCookie  = require('../utils/generateTokenAndSetCookies.js');
const sendVerificationToken = require('../mailtrap/email.js')
const sendPasswordResetEmail = require("../mailtrap/email.js");
const sendPasswordResetSuccessfullEmail = require("../mailtrap/email.js")
const signup = async (req, res) => {
    
    // Getting user data from body
    const { email, password, name } = req.body;
    try {
        if (!email || !name || !password) {
            throw new Error("All fields required");
        }
        
        
        const userAlreadyExist = await User.findOne({email});
        console.log("already exists", userAlreadyExist);
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000+ Math.random()* 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();

        // Token to verify on email - this is a function below in utils
         generateTokenAndSetCookie(res, user._id);
         sendVerificationToken(user.email, verificationToken); // Ensure this function is defined

        // Sending a response to verify the signup
        res.status(201).json({
            success: true,
            message: "Created",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Error getting the value", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const verifySignup = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({success:false, message: "invalid or expired code"})
        }
        user.isVerified=true;
        // deleting
        user.verificationToken= undefined;
        user.verificationTokenExpiresAt= undefined;
        await user.save();
        res.status(201).json({
            success: true,
            message: "verified",
            user: {
                ...user._doc,
                password: undefined
            }
        });
        console.log("user saved successfully")

    } catch (error) {
        
    }
};
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false , message: "invalid credentials"});

        }
        // comparing the password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false , message: "invalid credentials"});

        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        res.status(201).json({
            success: true,
            message: "Logged in",
            user: {
                ...user._doc,
                password: undefined
            }
        }); 
    } catch (error) {
        console.log("error logging in ", error);
        
    }
};

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message : "Loged out"
    })
};

const forgotPassword = async(req,res) =>{
const {email} = req.body;
try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    //  generate the reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 *60*60 *1000; // 1 hour
    // saving created things into database
    user.resetPasswordToken= resetToken;
    user.resetPasswordExpiresAt= resetTokenExpiresAt;
    await user.save();

    // send email to reset the email function
    await sendPasswordResetEmail(user.email, `http://localhost:5000/api/auth/resetpassword/${resetToken}`)
    return res.status(200).json({
        success:true,
        message: "mail sent"
    })
    
} catch (error) {
    console.log("unable to send",error);
    return res.status(400).send({
        success: false,
        message: "not sent"
    })
    
}
}

const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt :Date.now()}
        
        });
        if(!user){
            console.log("user Not found in DB");
            // throw new error("not found", error);
            return res.status(400).send({
                success: false,
                message: "user not found"
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        user.password = hashedPassword;
        await user.save();
        await sendPasswordResetSuccessfullEmail(user.email);

        return res.status(200).send({
                success: true,
                message: "reset successful"
        })
        
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "user not found"
        })
        console.log("error reseting", error);
        
    }

}
const checkAuth = async (req, res)=>{
    console.log("Checking auth for user ID:", req.userId);
    try {
        const user = await User.findById(req.userId).select("-password")
        console.log("user fetched", user);
        if(!user){
            return res.status(400).json({
                success:false,
                message: "user not found"
            })
        }
        res.status(200).json({success:true, user})
        
    } catch (error) {
        console.log("errior in checkAuth", error)
        res.status(400).json({success:false, message: error.message})
        
    }
}
// Exporting the functions using CommonJS syntax
module.exports = {
    signup,
    login,
    logout,
    verifySignup,
    forgotPassword,
    resetPassword,
    checkAuth,
};
