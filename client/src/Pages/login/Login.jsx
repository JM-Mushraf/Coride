import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../../Action Creators/UserAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../Loader/Loading";
import { bouncy } from 'ldrs'

bouncy.register()

// Default values shown

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  // const [avatarPreview, setAvatarPreview] = useState(userimg);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

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
    // if (!isLogin && avatar) {
    //   formData.append("avatar", avatar);
    // }
    dispatch(login(formData));
    // if (isLogin) {

    // } else {
    //   dispatch(register(formData));
    // }
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
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          {/* <div className="picture">
          <img src={userimg} alt="User" />
        </div> */}
          <div className="container2">
            <div className="loginhere">
              <span>Login</span>
              <span>Here</span>
            </div>
            <div className="container3">

              <div className="input">
                <div>
                <label htmlFor="username">Username</label>
                <input
                  className="login-input"
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
                {/* <div className="sep"></div> */}
                <div>
                <label htmlFor="password">Password</label>
                <input
                className="login-input"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                {/* <div className="sep"></div> */}
              </div>
              <div className="loginbt">
                <button onClick={handleSubmit}>Login</button>
              </div>
              <div className="question">
                <div>
                <Link
                className="Link"
                  to={"/register"}
                >
                   don't Have An Account?Register
                </Link>
                </div>
                <div>
                <Link className="Link" to={'/admin/login'} >Are You An Administrator? Click Here</Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
