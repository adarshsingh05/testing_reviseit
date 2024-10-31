// Creating the JSON Web Token
const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    console.log("Generating token for userId:", userId); // Log userId here
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};

// Exporting the function using CommonJS syntax
module.exports = generateTokenAndSetCookie;
