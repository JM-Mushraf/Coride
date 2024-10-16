// src/Components/SendMessage.js
import React, { useState } from "react";
import axios from "axios";
import "./SendMessage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const SendMessage = ({ userInfo }) => {
  const { isAuthenticated, loading,user } = useSelector((state) => state.user);
  const senderId=user.userOrAdmin._id;
  const receiverId = userInfo.id;
  const [messageContent, setMessageContent] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data}=await axios.post(`/chat`,{senderId,receiverId});
      const chatId=data._id;
      navigate('/notifications')
      
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="send-message-container">
      <div className="h2">
        <span>Send a </span>
        <span>Message</span>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} className="send-msg-form">
          <textarea
            placeholder="Message"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button type="submit">
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;