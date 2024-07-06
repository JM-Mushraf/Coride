import React from "react";
import "../components/Profile.css";

function Profile() {
  return (
    <div className="profile-box">
      <div className="container-prof">
      <div className="img"><img src="src\components\user.webp" alt="" /></div>
      <div className="container2-prof">
       <div className="name cont5-prof">
        <span>Name: </span>
        <span>JM Mushraf</span>
       </div>
       <div className="mail cont5-prof">
        <span>Email: </span>
        <span>mushraf1786@gmail.com</span>
       </div>
       <div className="start cont5-prof">
        <span>Start: </span>
        <span>KonanaKunte</span>
       </div>
       <div className="dest cont5-prof">
        <span>Destionation: </span>
        <span>AMCEC</span>
       </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;