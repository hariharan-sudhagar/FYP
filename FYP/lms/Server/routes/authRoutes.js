import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ✅ Normal User Login (with JWT & bcrypt)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Prevent password login for Google users
    if (user.password === "google-auth") {
      return res.status(400).json({ message: "Use Google login instead" });
    }

    // ✅ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Google Login (JWT but no bcrypt)
router.post("/google-login", async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    // ✅ Create user if not exists
    if (!user) {
      user = new User({ name, email, password: "google-auth", role: "student" });
      await user.save();
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Google login successful", user, token });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
