
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css"; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 700) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="src\components\logo.png" alt="Logo" />
        </div>
        {windowWidth <= 700 && (
          <button className="toggle-button" onClick={toggleMenu}>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
          </button>
        )}
        <div className={`navbar-links ${showMenu ? "active" : ""}`}>
          <Link to="#" className="con1">Home</Link>
          <Link to="#" className="con1">Search</Link>
          <Link to="#" className="con1">Create Trip</Link>
          <Link to="#" className="log">Login</Link>
          <Link to="#" className="log">Logout</Link>
          <span className="prof"><img src="src\components\user.webp" alt="Profile" /></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
