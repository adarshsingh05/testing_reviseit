const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Import fs module

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files from the uploads directory

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/papers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// File storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
    },
});

// Initialize Multer for file upload
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|png|jpeg|webp|jpg|docx|ppt|pptx|txt/; // Allowed file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb("Error: File type not supported!");
    }
});

// Create a Mongoose model for the uploaded files
const fileSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    examSlot: { type: String, required: true },
    examType: { type: String, required: true },
    filePath: { type: String, required: true },
    examDate: { type: Date, required: true },
});

const File = mongoose.model("File", fileSchema);

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
    const { semester, subject, examSlot, examType, examDate } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    try {
        // Create a new File document
        const newFile = new File({
            semester: semester.toUpperCase(),
            subject: subject.toUpperCase(),
            examSlot: examSlot.toUpperCase(),
            examType: examType.toUpperCase(),
            filePath: req.file.path, // Path to the uploaded file
            examDate: examDate
        });

        // Save the file information to the database
        await newFile.save();

        // Send a success response
        res.status(201).json({
            message: "File uploaded and saved successfully",
            file: req.file,
            details: { semester, subject, examSlot, examType, examDate },
        });
    } catch (error) {
        console.error("Error saving file to database:", error);
        res.status(500).json({ error: "An error occurred while uploading the file." });
    }
});
// Endpoint to get all uploaded files
app.get("/files", async (req, res) => {
    try {
        const files = await File.find(); // Fetch all files from the database
        res.json(files); // Send the files as a JSON response
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files." });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
