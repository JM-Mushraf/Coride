import React from "react";
import "../components/register.css";

function Register() {
  return (
    <div className="container">
      <div className="picture">
        <img src="src\components\user.webp" alt="User" />
      </div>
      <div className="container2">
        <div className="loginhere">Register Here</div>
        <div className="container3">
          <div className="input">
            <label htmlFor="userid">Userid</label>
            <br />
            <input type="text" id="userid" placeholder="Enter Userid" required />
            <div className="sep"></div>
            <label htmlFor="email">Email id</label>
            <br />
            <input type="email" id="email" placeholder="Enter Email" required />
            <div className="sep"></div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" placeholder="Enter Password" required />
            <div className="sep"></div>
          </div>
          <div className="loginbt">
            <button>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
