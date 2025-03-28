import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/homepage.css";
import logo from "../assets/default.svg";
import LearnBrige from "../assets/LearnBrige.png";

const techStacks = [
  "React", "Node.js", "MongoDB", "GraphQL", "Redux",
  "Express", "Docker", "Kubernetes", "TypeScript",
  "Firebase", "Webhooks", "gRPC", "OAuth",
  "Next.js", "TailwindCSS", "Jest", "Socket.io",
  "MySQL", "PostgreSQL", "RabbitMQ", "Redis",
  "Elasticsearch", "SASS", "Styled Components",
  "AWS", "Google Cloud", "Azure", "Terraform",
  "Ansible", "Jenkins", "GitHub Actions", "CircleCI",
  "FastAPI", "Spring Boot", "Flask", "Django"
];

const Home = () => {
  const navigate = useNavigate();
  const courses = ["Namaste Node.js", "React Essentials", "Advanced JavaScript"];

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Enhance Your Skills with Our LMS</h1>
          <p>Explore top courses and start learning today!</p>
          <button className="cta-button">Start Learning</button>
        </div>
        <div className="hero-image">
          <img src={logo} alt="Learning" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h3>Explore Our Categories</h3>
      </div>

      {/* Single Row Course Carousel */}
      <div className="courses-container">
        {courses.map((course, index) => (
          <div className="course-item" key={index}>
            <img src={LearnBrige} alt={course} className="course-img" />
            <h3>{course}</h3>
            <p>Master {course} with this comprehensive course.</p>
            <div className="rating">⭐⭐⭐⭐⭐ (4.8/5)</div>
            <span className="language">🌍 English</span>
            <button 
              className="view-details" 
              onClick={() => navigate(`/course/${index}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Tech Stack Carousel with Three Rows */}
      <div className="techstack-wrapper">
        {[...Array(3)].map((_, rowIndex) => (
          <div className="techstack-container" key={rowIndex}>
            <div
              className={`techstack-carousel ${
                rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"
              }`}
            >
              {[...techStacks, ...techStacks].map((tech, index) => (
                <div key={index} className="techstack-item">{tech}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer>
        <center>
          <h2>Contact</h2>
          <h3>+91 1234567890 | learnbridge@gmail.com</h3>
          <p>9th street Avenue Park, Madurai, 625620</p>
        </center>
      </footer>
    </div>
  );
};

export default Home;
