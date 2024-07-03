import React from "react";
import "../components/login.css";

function Login() {
  return (
    <div className="container">
      <div className="picture">
        <img src="src\components\user.webp" alt="User" />
      </div>
      <div className="container2">
        <div className="loginhere">Login Here</div>
        <div className="container3">
          <div className="input">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              required
            />
            <div className="sep"></div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
            />
            <div className="sep"></div>
          </div>
          <div className="loginbt">
            <button>Login</button>
          </div>
          <div className="question">
            <a href="#">Already Have An Account?</a>
            <br />
            <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
