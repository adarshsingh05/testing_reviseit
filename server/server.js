const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth.routes'); // Ensure the path is correct
const cookieParser  = require('cookie-parser')

const { connectDB, File } = require("./DB/connectFileDB"); // Import connectDB and File model
const { signup } = require("./controller/auth.controller");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// File storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|png|jpeg|webp|jpg|docx|ppt|pptx|txt/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb("Error: File type not supported!");
    }
});

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
    const { semester, subject, examSlot, examType, examDate } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    try {
        const newFile = new File({
            semester: semester.toUpperCase(),
            subject: subject.toUpperCase(),
            examSlot: examSlot.toUpperCase(),
            examType: examType.toUpperCase(),
            filePath: req.file.path,
            examDate: examDate
        });

        await newFile.save();

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

app.use('/api/auth', authRoutes);
// Endpoint to get all uploaded files
app.get("/files", async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files." });
    }
});

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
