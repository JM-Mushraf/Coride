import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Trip from "../Components/Trip";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TripInfoCard.css";

import Loading from "../Loader/Loading";
import toast from "react-hot-toast";
import SendMessage from "./Messages/SendMessage";
const TripInfoCard = ({ trip }) => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();

  const getSingleTrip = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/trips/${params.id}`
      );
      console.log(data);
      const trip = data.getSingleTrip[0];
      setUserInfo({
        id: trip.createdBy._id,
        name: trip.createdBy.name,
        email: trip.createdBy.email,
        avatar: trip.createdBy.avatar,
        startLocation: trip.startLocation,
        destination: trip.destination,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getSingleTrip();
    } else {
      toast.error("you need to login to access this resource");
    }
  }, [params.id, isAuthenticated]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="profile-box">
          <div className="container-prof">
            <div className="container-prof2">
              <div className="img">
                <img src={userInfo?.avatar?.url} alt="" />
              </div>
              <div className="container2-prof">
                <div className="name cont5-prof">
                  <span>Name: </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="mail cont5-prof">
                  <span>Email: </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="start cont5-prof">
                  <span>Start: </span>
                  <span>{userInfo.startLocation}</span>
                </div>
                <div className="dest cont5-prof">
                  <span>Destionation: </span>
                  <span>{userInfo.destination}</span>
                </div>
              </div>
            </div>
            <SendMessage userInfo={userInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TripInfoCard;
