import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./AdminLogin.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../Loader/Loading";
import { adminLogin } from "../../Action Creators/AdminAction";
function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  // const [avatarPreview, setAvatarPreview] = useState(userimg);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.admin);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    
    await dispatch(adminLogin(formData));
    Navigate('/admin/dashboard')
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/");
    }
  }, [ Navigate]);

  

  return (
    <div className="AD-login-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="AD-container">
          
          <div className="AD-container2">
            <div className="AD-loginhere">
              <span>Login</span>
              <span>Here</span>
            </div>
            <div className="AD-container3">
              <div className="AD-input">
                <div className="ADD-in">
                <label htmlFor="username">Email</label>
                <input
                  className="AD-login-input"
                  type="text"
                  id="username"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
                <div className="ADD-in">
                <label htmlFor="password">Password</label>
                <input
                className="AD-login-input"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>
              </div>
              <div className="AD-loginbt">
                <button onClick={handleSubmit}>Login</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
