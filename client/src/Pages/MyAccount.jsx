import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyTrip from "../Components/MyTrip";
import toast from "react-hot-toast";
import "./MyAccount.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const MyAccount = () => {
  const navigate=useNavigate()
  const { trips, error, loading } = useSelector((state) => state.trips); // Assuming trips are stored in Redux state
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [tripData, setTripData] = useState([]);

  const getMyTrips = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/trips/my`);
      console.log(data);
      await setTripData(data.mytrips);
      console.log(tripData);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleDelete=async(tripId)=>{
    try {
      const {data}=await axios.delete(`http://localhost:3000/trips/delete/${tripId}`);
      setTripData(tripData.filter(trip => trip._id !== tripId));
      toast.success(data.message)
    } catch (error) {
      
    }
  }

  useEffect(()=>{

  },[tripData])
  return isAuthenticated ? (
    <div className="m-account-container">
    <div className="account-container">
      <div className="user-details-myacc">
        <div className="user-image">
          <img src={user.userOrAdmin.avatar.url} alt="" />
        </div>
         <div className="user-details-myacCard">
          <div className="details">
        <div className="user-name ">
          <span>UserName:{" "}</span>
          <span>{user.userOrAdmin.name}</span>
        </div>
        <div className="user-email">
        <span>email:{"  "}</span>
        <span>{user.userOrAdmin.email}</span>
        </div>
        </div>
        <div className="btn">
          <button>Logout</button>
        </div>
        </div>
      </div>

      <div className="trip-container-myacc">
        <button onClick={getMyTrips} className="gettrip" >Get My Trips</button>

        {tripData &&
          tripData.map((trip) => <MyTrip trip={trip} key={trip._id}  onDelete={handleDelete} />)}
      </div>
    </div>
    </div>
  ) : (
    <div>You Need to access this resouce by login</div>
  );
};

export default MyAccount;
