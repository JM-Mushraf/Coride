import React, { useState, useEffect } from "react";
import "./Register.css";
import ProfilePhoto from "../../../public/profile.png";
import { register } from "../../Action Creators/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loader/Loading";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { isAuthenticated, loading } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(ProfilePhoto);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [adminEmail,setAdminEmail]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Avatar:", avatar);

      toast.error("Please enter all the details!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      formData.append("adminEmail",adminEmail)
      try {
        const response = await dispatch(register(formData));
        if(response.success){
          toast.success(response.message);
          loading=false;
          navigate('/')
        }
        
      } catch (error) {
        toast.error("An error occurred!");
      }
    }
  };

  const registerDataChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    console.log(avatar,name,email);
  }, [isAuthenticated, navigate,avatar]);

  return loading ? (
    <Loading />
  ) : (
    <div className="register-container">
      
      <div className="registration-container">
        <div className="picture">
          <img src={avatarPreview} alt="Avatar Preview" />
          <div
            className="edit-icon"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            &#9998;
          </div>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={registerDataChange}
            id="avatarInput"
            style={{ display: "none" }}
          />
        </div>
        <div className="container2">
          <div className="container3">
            <div className="registerhere">
              <span>Register</span>
              <span>Here</span>
            </div>
            <div className="input">
              <div>
                <label htmlFor="userid">Name</label>
                <input
                  type="text"
                  id="userid"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="adminEmail">AdminEmail</label>
                <input
                  type="email"
                  id="adminEmail"
                  placeholder="Admin Email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="registerbtn">
              <button onClick={handleSubmit}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
