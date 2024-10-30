const User  = require('../models/user.model.js');
console.log("user", User)
const bcryptjs = require('bcryptjs');
const  generateTokenAndSetCookie  = require('../utils/generateTokenAndSetCookies.js');
const sendVerificationToken = require('../mailtrap/email.js')
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
    
};
const login = async (req, res) => {
    res.send("Login route");
};

const logout = async (req, res) => {
    res.send("Logout route");
};

// Exporting the functions using CommonJS syntax
module.exports = {
    signup,
    login,
    logout,
    verifySignup,
};
