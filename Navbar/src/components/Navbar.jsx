import React, { useState, useEffect } from "react";
import "../components/Navbar.css"; // Import your CSS file
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close the menu if screen width is greater than 700px
      if (window.innerWidth > 700) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
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
          <a href="#">Logo</a>
        </div>
        {windowWidth <= 700 && (
          <button className="toggle-button" onClick={toggleMenu}>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
          </button>
        )}
        <div className={`navbar-links ${showMenu ? "active" : ""}`}>
          <a href="#"className="con1">Home</a>
          <a href="#"className="con1">Search</a>
          <a href="#"className="con1">Create Trip</a>
          <a href="#" className="log">Login</a>
          <a href="#" className="log">Logout</a>
          <span className="prof"><a href="#">Profile</a></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
