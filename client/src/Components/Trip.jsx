import React from "react";
import { Link } from "react-router-dom";
import "./Trip.css";
import { useSelector } from "react-redux";
import persImg from "../../public/profile.png";
import { FaArrowRight } from "react-icons/fa";
import TripInfoCard from "../Pages/TripInfoCard";
import { useNavigate } from "react-router-dom";

const Trip = ({ trip }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(trip);
  };

  // Add optional chaining and default value
  const personImg = trip.createdBy?.avatar?.url || persImg;

  return (
    <div className="TC">
      <Link
        className="trip-card scale"
        to={{
          pathname: `/trips/${trip._id}`,
          state: { trip },
        }}
      >
        <div className="person-image-container">
          {/* Use the safe personImg variable */}
          <img src={personImg} alt="User Image" />
        </div>
        <div className="trip-info-container">
          <div className="name">
            <span>Name:{" "}</span>
            <span>{trip.createdBy?.name || 'Unknown User'}</span>
          </div>
          <div className="name">
          <span>Date:{" "}</span>
          <span>{trip.date.split("T")[0]}</span>
          </div>
          <div className="name">
          <span>Time:{" "}</span>
          <span>{trip.time}</span>
          </div>
          <div className="name loc">
            <span>{trip.startLocation}</span>
            <FaArrowRight /> 
            <span>{trip.destination}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Trip;
