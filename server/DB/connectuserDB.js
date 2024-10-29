const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("uri: ", process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Use CommonJS module export
