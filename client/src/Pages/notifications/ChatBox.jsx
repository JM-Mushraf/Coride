import React, { useEffect, useState } from "react";
import "./ChatBox.css";

import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    console.log(userId);
    
    const getUserData = async () => {
      try {
        const { data:user } = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserData(user);
        console.log(user);
        
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat?._id) {
          const { data } = await axios.get(`http://localhost:3000/message/${chat._id}`);
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages: ", error);
      }
    };
    fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await axios.post('http://localhost:3000/message', message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ChatBox-container">
      {/* CHAT HEADER */}
      <div className="chat-header">
        <div><img src={userData?.user?.avatar.url} alt="" className="followerImage" /></div>
          <div className="name">
              {userData?.user.name}
          </div>
      </div>

      {/* CHAT BODY */}
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.senderId === currentUser ? "message own" : "message"}
          >
            <span>{message.text}</span>
            <span>{format(message.createdAt)}</span>
          </div>
        ))}
      </div>

      {/* CHAT SENDER */}
      <div className="chat-sender">
        <div>+</div>
        <InputEmoji value={newMessage} onChange={handleChange}/>
        <button className="send-button button" onClick={handleSend} disabled={newMessage.length<=0}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
