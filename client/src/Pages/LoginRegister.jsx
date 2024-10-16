import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../Action Creators/UserAction";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../../public/profile.png";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(ProfilePhoto);
 
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const userCredentials = {
    name,
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (!isLogin && avatar) {
      formData.append("avatar", avatar);
    }

    if (isLogin) {
      dispatch(login(formData));
    } else {
      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/");
    }
  }, [isAuthenticated, Navigate]);

  const registerDataChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="heading">{isLogin ? "Login" : "Register"}</div>
        <div className="login-form-box">
          <form action="" className="login-form" onSubmit={handleSubmit}>
            {isLogin ? null : (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLogin ? null : (
              <div className="image-upload-box">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
          <a onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"} instead?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
