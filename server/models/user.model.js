const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    coins: {
        type: Number,
        default: 0, // Default value for coins
    },
    paperUpload: {
        type: Number,
        default: 0, // Default value for coins
    },
    paperDownload: {
        type: Number,
        default: 0, // Default value for coins
    },
}, { timestamps: true });

const User = mongoose.model("createdUsers", userSchema);
module.exports = User;