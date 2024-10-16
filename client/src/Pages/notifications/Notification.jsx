import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.user);
  const userId = user.userOrAdmin._id;

  const [currentChat, setCurrentChat] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showChatList, setShowChatList] = useState(true); 
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/chat/${userId}`);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userId]);

  const handleConversationClick = (chat, userData) => {
    setCurrentChat(chat);
    setActiveChatId(chat._id);

   
    if (window.innerWidth <= 500) {
      setShowChatList(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 776) {
      setShowChatList(true);
    } else {
      setShowChatList(false); 
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  };

  return (
    <div className="Chat">
      <div className="show-chat" onClick={toggleChatList}>
        ☰
      </div>

      <div
        className="Left-side-chat"
        style={{ display: showChatList ? "flex" : "none" }}
      >
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat._id}>
                <Conversation
                  data={chat}
                  currentUserId={userId}
                  activeChatId={activeChatId}
                  onClick={(userData) => handleConversationClick(chat, userData)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <ChatBox chat={currentChat} currentUser={userId} />
      </div>
    </div>
  );
};

export default Chat;
