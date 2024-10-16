



import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import corideLogo from '../../public/coridelogo.jpg'
import toast from "react-hot-toast";
import { logout } from "../Action Creators/UserAction";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";
import { FaRegMessage } from "react-icons/fa6";
const Navbar = () => {
  const {admin}=useSelector((state)=>state.admin)  
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [bellClass,setBellClass]=useState("con1")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const personImg = user.user.avatar && trip.createdBy.avatar.url ? trip.createdBy.avatar.url : persImg;

 const dispatch=useDispatch();
  const navigate=useNavigate();
  const isThereNotifications=async()=>{
    const response = await axios.get('/message/view');
    if(response.data.messages==[]){
      return false;
    }
    else return true;
  }
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
  // const userImg=user.user.avatar && user.user.avatar.url ? user.user.avatar.url : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png";
  const userAvatar = user?.userOrAdmin?.avatar?.url || "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png";
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout=async()=>{
    dispatch(logout());
    
    navigate('/')
}


  return (
    <div className="body">
    {admin?null:<nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={corideLogo} alt="Logo" />
        </div>
        {windowWidth <= 700 && (
          <button className="toggle-button" onClick={toggleMenu}>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
            <span className={`bar ${showMenu ? "open" : ""}`}></span>
          </button>
        )}
        <div className={`navbar-links ${showMenu ? "active" : ""} nl`}>
          <Link to="/" className="con1">Home</Link>
          {/* <Link to="/" className="con1">Search</Link> */}
          {isAuthenticated?<Link to="/create" className="con1">Create Trip</Link>:null}
          {isAuthenticated?<Link to="/notifications" className={bellClass} id="notificationBell" >{isThereNotifications?<FaRegMessage />:<FaBell/>}</Link>:null}
          
          {isAuthenticated?<Link className="log" onClick={handleLogout} >Logout</Link>:
          <Link to="/login" className="log">Login</Link>}
          {isAuthenticated?null:<Link to="/register" className="log reg">Register</Link>}
          {isAuthenticated?<Link className="prof" to={'/me'} ><img src={userAvatar} alt="image" /></Link>:null}
        </div>
      </div>
    </nav>}
    </div>
  );
};

export default Navbar;