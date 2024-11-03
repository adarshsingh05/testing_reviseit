const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth.routes'); // Ensure the path is correct
const cookieParser = require('cookie-parser');

const { connectDB } = require("./DB/connectFileDB"); // Import connectDB
const { createClient } = require('@supabase/supabase-js');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client initialization

const supabaseUrl = 'https://oqufvztnijspmjevvccb.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdWZ2enRuaWpzcG1qZXZ2Y2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTI3NjQsImV4cCI6MjA0NjA4ODc2NH0.CpM01ukH_Gv5CKjSs4SD2Pk6O1CekiZ28q1S3ZVwEkY'; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or provide your service account key
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// File storage configuration for Multer
const storage = multer.memoryStorage(); // Use memory storage for Supabase
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
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
app.post("/api/auth/upload", upload.single("documents"), async (req, res) => {
    const { semester, subject, examSlot, examType, examDate, userId, uploadedBy } = req.body; // Assuming you're also passing userId
    console.log(req.body); // Log the request body
    console.log(req.file); 

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    try {
        const bucketName = 'user_docs'; // Adjust this if needed
        const filePath = `public/${Date.now()}_${req.file.originalname}`;

        // Upload file to Supabase
        const { data, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return res.status(500).json({ error: uploadError.message });
        }

        const fileUrl = supabase.storage.from(bucketName).getPublicUrl(filePath).publicUrl;

        // Save document details in Supabase database
        const { error: dbError } = await supabase
            .from('documents')
            .insert([
                { 
                    userId: userId, // Ensure this is provided
                    semester: semester.toUpperCase(),
                    subject: subject.toUpperCase(),
                    examSlot: examSlot.toUpperCase(),
                    examType: examType.toUpperCase(),
                    filePath: fileUrl,
                    examDate: examDate,
                    uploadedBy: uploadedBy
                }
            ]);

        if (dbError) {
            console.error("Database error:", dbError);
            return res.status(500).json({ error: dbError.message });
        }

        res.status(201).json({
            message: "File uploaded and saved successfully",
            file: req.file,
            fileUrl: fileUrl,
            details: { semester, subject, examSlot, examType, examDate, userId },
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "An error occurred while uploading the file." });
    }
});


// Use auth routes
app.use('/api/auth', authRoutes);

// Endpoint to get all uploaded files
app.get("/api/auth/view", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('documents') // Ensure this is the correct table name
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files." });
    }
});
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
    });
}

// Start the server
app.listen(PORT, () => {
    connectDB(); // Make sure this function connects your DB properly
    console.log(`Server running on http://localhost:${PORT}`);
});
