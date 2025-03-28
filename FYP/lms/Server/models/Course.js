import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  videoFiles: [{ type: String }], // Store file paths
  videoURLs: [{ type: String }], // Store external URLs
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String }, // Store thumbnail path
  sections: [sectionSchema], // Array of sections
  quizzes: [quizSchema], // Array of quizzes
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
