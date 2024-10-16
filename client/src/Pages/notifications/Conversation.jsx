import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Conversation.css";

const Conversation = ({ data, currentUserId, onClick, activeChatId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = data.members.find((id) => id !== currentUserId);
        const { data: user } = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserData(user);
      } catch (error) {
        console.log("Error fetching user data:", error);
        setUserData({ user: { name: "Unknown", avatar: { url: "/default-avatar.png" } } });
      }
    };
    fetchUserData();
  }, [data, currentUserId]);

  const handleClick = () => {
    if (userData) {
      onClick(userData);
    }
  };

  const isActive = activeChatId === data._id;

  return (
    <div
      className={`follower_conversation ${isActive ? "active-conversation" : ""}`}
      onClick={handleClick}
    >
      <div className="follower_conversation-in">
        <img
          src={userData?.user?.avatar?.url}
          className="followerImage123"
          alt="Avatar"
        />
        <div className="name">{userData?.user?.name}</div>
      </div>
    </div>
  );
};

export default Conversation;
