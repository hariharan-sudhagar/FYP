import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { FaSearch, FaBell, FaUser, FaFire } from "react-icons/fa";
import logo from "../assets/default.svg";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="floating-navbar">
      {/* Left - Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Center - Navigation Links */}
      <ul className="nav-links">
        <li><a href="/courses">Course</a></li>
        <li><a href="/roadmap">Roadmap</a></li>
        <li><a href="/my-courses">My Course</a></li>
      </ul>

        {/* Right - Icons */}
        <div className="nav-icons">

{/* Search Bar (Always Visible) */}
<div className="search-container">
  <FaSearch className="search-icon" />
  <input type="text" placeholder="Search..." className="search-bar" />
</div>
<FaFire className="icon" title="Streaks" />

{/* Notifications */}
<FaBell className="icon" title="Notifications" />

{/* Profile Icon & Dropdown */}
<div className="profile-container">
  <FaUser
    className="icon"
    title="Profile"
    onClick={() => setShowProfile(!showProfile)}
  />
  {showProfile && (
    <div className="profile-dropdown">
      <ul>
        <li><a href="/profile">View Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li onClick={() => alert("Logging out...")}>Logout</li>
      </ul>
    </div>
  )}
</div>
       </div>
    </nav>
  );
};

export default Navbar;