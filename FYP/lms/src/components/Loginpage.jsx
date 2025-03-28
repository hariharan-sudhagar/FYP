import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import bgImage from "../assets/default.svg";
import "../styles/Loginpage.css";

const LoginPage = () => {
  const [showForm, setShowForm] = useState("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  // ✅ Handle Sign In API Call - FIXED URL
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      alert(response.data.message);
      if (response.data.user.role === "admin") {
        navigate("/AdminDashboard"); // Redirect admin
      } else {
        navigate("/landing"); // Redirect student
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Handle Sign Up API Call - FIXED URL
  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      alert("User signed up successfully!");
      setShowForm("signin"); // Redirect to Sign In form
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Sign up failed");
    }
  };

  
  const handleGoogleLogin = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log("Google User:", decoded);
  
      const res = await axios.post("http://localhost:5000/api/auth/google-login", {
        email: decoded.email,
        name: decoded.name || "Google User", // ✅ Use fallback if name is missing
      });
  
      alert(res.data.message);
      navigate("/landing"); 
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google Login Error");
    }
  };
  
  
  return (
    <div className="container">
      <div className="background" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="gradient-overlay"></div>
      </div>

      <div className="content">
        <h1>
          {showForm === "signup"
            ? "Sign Up Here"
            : showForm === "signin"
            ? "Sign In Here"
            : showForm === "forgot-password"
            ? "Forgot Password?"
            : "Welcome to Our Platform"}
        </h1>

        {showForm === "default" ? (
          <div className="buttons">
            <button className="signup-btn" onClick={() => setShowForm("signup")}>
              Sign Up
            </button>
            <button className="signin-btn" onClick={() => setShowForm("signin")}>
              Sign In
            </button>
          </div>
        ) : showForm === "signup" ? (
          <div className="signup-form">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="signup-btn" onClick={handleSignUp}>
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setShowForm("signin")} className="link">
                Sign In
              </span>
            </p>
          </div>
        ) : showForm === "signin" ? (
          <div className="signin-form">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <span className="forgot-password" onClick={() => setShowForm("forgot-password")}>
                Forgot Password?
              </span>
            </div>

            <button className="signin-btn" onClick={handleSignIn}>
              Sign In
            </button>

            <div className="divider">OR</div>

            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Google Login Failed")} />

            <p>
              Don't have an account?{" "}
              <span onClick={() => setShowForm("signup")} className="link">
                Sign Up Here
              </span>
            </p>
          </div>
        ) : (
          <div className="forgot-password-form">
            <input type="email" placeholder="Enter your email" />
            <button className="reset-btn">Reset Password</button>
            <p>
              Remembered your password?{" "}
              <span onClick={() => setShowForm("signin")} className="link">
                Back to Sign In
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;