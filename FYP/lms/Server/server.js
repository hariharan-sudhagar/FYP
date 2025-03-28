import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));

// Serve uploaded files (videos)
app.use("/uploads", express.static("uploads")); // ✅ This allows accessing uploaded videos

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes); // ✅ Add course routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
