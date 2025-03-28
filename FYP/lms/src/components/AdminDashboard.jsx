import { useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";
const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [sections, setSections] = useState([
    { sectionName: "", videoFiles: [], videoURLs: [""] },
  ]);
  const [quizzes, setQuizzes] = useState([{ question: "", options: ["", ""], correctAnswer: "" }]);

  const handleAddSection = () => {
    setSections([...sections, { sectionName: "", videoFiles: [], videoURLs: [""] }]);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleVideoUpload = (index, files) => {
    const updatedSections = [...sections];
    updatedSections[index].videoFiles = files;
    setSections(updatedSections);
  };

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { question: "", options: ["", ""], correctAnswer: "" }]);
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    sections.forEach((section, index) => {
      formData.append(`sections[${index}][sectionName]`, section.sectionName);
      section.videoFiles.forEach((file) => formData.append(`videos`, file));
      section.videoURLs.forEach((url) => formData.append(`sections[${index}][videoURLs][]`, url));
    });

    quizzes.forEach((quiz, index) => {
      formData.append(`quizzes[${index}][question]`, quiz.question);
      quiz.options.forEach((option, optIndex) => {
        formData.append(`quizzes[${index}][options][${optIndex}]`, option);
      });
      formData.append(`quizzes[${index}][correctAnswer]`, quiz.correctAnswer);
    });

    try {
      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Course added successfully!");
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />

        {sections.map((section, index) => (
          <div key={index}>
            <input type="text" placeholder="Section Name" value={section.sectionName} onChange={(e) => handleSectionChange(index, "sectionName", e.target.value)} required />
            <input type="file" multiple onChange={(e) => handleVideoUpload(index, e.target.files)} />
            {section.videoURLs.map((url, urlIndex) => (
              <input key={urlIndex} type="text" placeholder="Video URL" value={url} onChange={(e) => {
                const updatedSections = [...sections];
                updatedSections[index].videoURLs[urlIndex] = e.target.value;
                setSections(updatedSections);
              }} />
            ))}
            <button type="button" onClick={() => handleSectionChange(index, "videoURLs", [...section.videoURLs, ""])}>+ Add Video URL</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSection}>+ Add Section</button>

        {quizzes.map((quiz, index) => (
          <div key={index}>
            <input type="text" placeholder="Quiz Question" value={quiz.question} onChange={(e) => handleQuizChange(index, "question", e.target.value)} required />
            {quiz.options.map((option, optIndex) => (
              <input key={optIndex} type="text" placeholder={`Option ${optIndex + 1}`} value={option} onChange={(e) => {
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[index].options[optIndex] = e.target.value;
                setQuizzes(updatedQuizzes);
              }} required />
            ))}
            <input type="text" placeholder="Correct Answer" value={quiz.correctAnswer} onChange={(e) => handleQuizChange(index, "correctAnswer", e.target.value)} required />
            <button type="button" onClick={() => handleQuizChange(index, "options", [...quiz.options, ""])}>+ Add Option</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuiz}>+ Add Quiz</button>

        <button type="submit">Upload Course</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
