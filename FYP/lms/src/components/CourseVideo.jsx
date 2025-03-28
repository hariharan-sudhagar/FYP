import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../styles/CourseVideo.css";

const courseVideos = {
  0: [
    { title: "Introduction", url: "https://youtu.be/pN6jk0uUrD8?si=TxYKwwWHgxdqoYvT" },
    { title: "Video 1", url: "https://youtu.be/ZvbzSrg0afE?si=hZHzYc0TtpzUTDTk" },
    { title: "Video 2", url: "https://youtu.be/iLWTnMzWtj4?si=b0QL6jtUzVkZjb8C" },
    { title: "Video 3", url: "https://youtu.be/Fnlnw8uY6jo?si=bnFrx3ieT0NAVpm0" },
  ],
  1: [
    { title: "React Basics", url: "https://youtu.be/Ke90Tje7VS0" },
    { title: "React Components", url: "https://youtu.be/bMknfKXIFA8" },
    { title: "React State Management", url: "https://youtu.be/Oioo0IdoEls" },
  ],
  2: [
    { title: "Advanced JS: Closures", url: "https://youtu.be/3a0I8ICR1Vg" },
    { title: "Advanced JS: Prototypes", url: "https://youtu.be/wstwjQ1yqWQ" },
    { title: "Advanced JS: Event Loop", url: "https://youtu.be/8aGhZQkoFbQ" },
  ],
};

const courses = ["Namaste Node.js", "React Essentials", "Advanced JavaScript"];

const CourseVideo = () => {
  const { id } = useParams();
  const videos = courseVideos[id] || [];
  const [currentVideo, setCurrentVideo] = useState(videos[0]?.url || "");
  const [completedVideos, setCompletedVideos] = useState(new Set());

  const handleMarkComplete = (index) => {
    setCompletedVideos((prev) => new Set([...prev, index]));
  };

  const progress = (completedVideos.size / videos.length) * 100;

  return (
    <div className="course-container">
      <h2 className="course-title">{courses[id]}</h2>
      <div className="course-content">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Course Videos</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          
              <ul className="video-list">
        {videos.map((video, index) => (
          <li key={index}>
            {!completedVideos.has(index) && (
              <button onClick={() => handleMarkComplete(index)}>Mark as Complete</button>
            )}
            <span onClick={() => setCurrentVideo(video.url)}>{video.title}</span>
            {completedVideos.has(index) && <span> ✅</span>}
          </li>
        ))}
        </ul> 

          
        </div>
     
        {/* Video Player */}
        <div className="video-section">
          {currentVideo ? (
            <ReactPlayer url={currentVideo} controls width="100%" height="100%" />
          ) : (
            <p>No videos available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
