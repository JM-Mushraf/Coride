import React from "react";
import './MyTrip.css'
import { MdDateRange } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const MyTrip = ({ trip,onDelete }) => {
  return (
    <div className="mytrip-details-box" >
      {/* <div className="start">{trip.date}</div>
        <div className="start">{trip.startLocation}</div>
        <div className="start">{trip.destination}</div> */}

      <div className="mytrip-date">
        <div className="start"><MdDateRange/> {trip.date}</div>
        {trip.expired?<span style={{color:"red"}}  >Expired</span>:<span  style={{color:"green"}} >Active</span>}
      </div>
      <div className="mytrip-startloc s1">
        <div className="start">
          <span>FROM : {" "}</span>
          <span>{trip.startLocation}</span>
        </div>
      </div>
      <div className="mytrip-dest s1">
        <div className="start"><span>TO : {" "}</span>
        <span>{trip.destination}</span></div>
      </div>
      <MdDelete onClick={()=>onDelete(trip._id)} className="mytrip-delete" size={20} color="red"  />
      
    </div>
  );
};

export default MyTrip;
