import express from "express";
import multer from "multer";
import Course from "../models/Course.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Add Course (POST /api/courses)
router.post("/", upload.fields([{ name: "videos", maxCount: 10 }, { name: "thumbnail", maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, sections, quizzes } = req.body;
    const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0].path : null;

    const parsedSections = JSON.parse(sections).map((section, index) => ({
      sectionName: section.sectionName,
      videoFiles: req.files["videos"] ? req.files["videos"].map((file) => file.path) : [],
      videoURLs: section.videoURLs,
    }));

    const parsedQuizzes = JSON.parse(quizzes).map((quiz) => ({
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
    }));

    const newCourse = new Course({
      title,
      description,
      thumbnail,
      sections: parsedSections,
      quizzes: parsedQuizzes,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
});

// ✅ Get All Courses (GET /api/courses)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

export default router;
