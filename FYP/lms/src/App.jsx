import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Loginpage";
// import Landing from "./components/landing";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import CourseVideo from "./components/CourseVideo";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/landing" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/course/:id" element={<CourseVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
