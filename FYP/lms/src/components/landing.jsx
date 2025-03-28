import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data); // Assuming backend returns an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1>Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>

              {/* If course has video URL, embed it */}
              {course.videoURL && (
                <iframe
                  width="100%"
                  height="315"
                  src={course.videoURL}
                  title="Course Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}

              {/* If course has uploaded video file, play it */}
              {course.videoFile && (
                <video width="100%" height="315" controls>
                  <source src={`http://localhost:5000/uploads/${course.videoFile}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
