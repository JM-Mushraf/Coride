import React from 'react'
import './Search.css'
import { useDispatch, useSelector } from "react-redux";
import { getAllTrips } from '../../Action Creators/TripAction';
import { useEffect } from 'react';
const Search = ({start,destination,date,setstart,setDestination,setDate}) => {
    const dispatch=useDispatch();
    useEffect(() => {
        
        dispatch(getAllTrips(start, destination, date));
        // console.log(trips);
      }, [dispatch, start, destination, date]);
   
  return (
    <div className="search-container">
          <div className="s1 search-person-img">
            <input
              type="text"
              value={start}
              onChange={(e) => setstart(e.target.value)}
              placeholder="Enter the Start Location"
              id="Start"
            />
          </div>
          <div className="s1">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter Destination"
              id="dest"
            />
          </div>
          <div className="s1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              className="nocal styled-date"
            />
          </div>
        </div>
  )
}

export default Search