const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    console.log("Generating token for userId:", userId.toString()); // Convert to string here
    const token = jwt.sign({ userId: userId.toString() }, "mysecretkey", {
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

module.exports = generateTokenAndSetCookie;
