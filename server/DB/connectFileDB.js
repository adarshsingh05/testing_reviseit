// connectuserDB.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://adarshsinghunschool:LlysdL8hhdfQ6iYM@users.k9psk.mongodb.net/Users?retryWrites=true&w=majority&appName=Users");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// Define the Mongoose schema and model for uploaded files
const fileSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    examSlot: { type: String, required: true },
    examType: { type: String, required: true },
    filePath: { type: String, required: true },
    examDate: { type: Date, required: true },
});

const File = mongoose.model("file", fileSchema);

// Export the connectDB function and File model
module.exports = { connectDB, File };
