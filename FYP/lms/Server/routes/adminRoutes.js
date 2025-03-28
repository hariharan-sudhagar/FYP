import express from "express";
import multer from "multer";
import path from "path";
import Course from "../models/Course.js"; // Import Course Model
import { isAdmin } from "../middleware/authMiddleware.js"; // Admin auth middleware

const router = express.Router();

// Multer setup for file uploads (videos, PDFs, images)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ✅ Route 1: Upload Course
router.post(
  "/courses",
  isAdmin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videos", maxCount: 10 },
    { name: "otherFiles", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { title, description, sections, quizzes } = req.body;

      // Parse sections & quizzes from formData
      const parsedSections = JSON.parse(sections).map((section) => ({
        sectionName: section.sectionName,
        videoFiles: req.files["videos"]?.map((file) => file.path) || [],
        videoURLs: section.videoURLs || [],
        otherFiles: req.files["otherFiles"]?.map((file) => file.path) || [],
      }));

      const parsedQuizzes = JSON.parse(quizzes);

      // Create and save the course
      const newCourse = new Course({
        title,
        description,
        thumbnail: req.files["thumbnail"]
          ? req.files["thumbnail"][0].path
          : null,
        sections: parsedSections,
        quizzes: parsedQuizzes,
      });

      await newCourse.save();
      res
        .status(201)
        .json({ message: "Course added successfully!", course: newCourse });
    } catch (error) {
      console.error("Error uploading course:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ✅ Route 2: Fetch all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

export default router;
