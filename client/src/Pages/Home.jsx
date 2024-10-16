import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrips } from "../Action Creators/TripAction";
import Trip from "../Components/Trip";
import "./Home.css";
import Loading from "../Loader/Loading.jsx";
import toast from "react-hot-toast";
import HomeSlider from "../Components/HomeSlider";
import Search from "../Components/Search/Search.jsx";
import { Link } from "react-router-dom";
import Footer from "../Components/footer.jsx"
import Coridetxt from "../Components/Coride_txt/coridetxt.jsx"

const Home = () => {
  const dispatch = useDispatch();
  const { trips, error, loading } = useSelector((state) => state.trips); // Assuming trips are stored in Redux state
  const { isAuthenticated } = useSelector((state) => state.user); // Assuming trips are stored in Redux state

  const [start, setstart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");



  return (
    <div className="home-container">
      {/* <HomeSlider className="home-container-slider" /> */}
      <Coridetxt/>
      <div className="homesliderimg">
        <HomeSlider />
      </div>
      <div className="trip-container">
        {/* <div className="search">
          <div className="source-div">
            <div>Enter the source of travel</div>
            <input
              type="text"
              value={start}
              onChange={(e) => setstart(e.target.value)}
            />
          </div>
          <div className="destination-div">
            <div>Enter the destination of travel</div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="date-div">
            <div>Enter the date of travel</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div> */}
        
        <Search start={start} destination={destination} date={date} setstart={setstart} setDestination={setDestination} setDate={setDate} />
        <div className="sep"></div>
        {isAuthenticated ? (
          loading ? (
            <Loading />
          ) : (
            <div className="trip-card-container">
              {trips && trips.map((trip) => <Trip trip={trip} key={trip._id}/>)}
            </div>
          )
        ) : ( 
          
          <div className="restrict-container">
        <h1>Access Restricted</h1>
        <p>Please log in or register to access the trips</p>
        <div className="restrict-button-container">
            <Link to={'/login'} className="restrict-button">Log In</Link>
            <Link to={'/register'} className="restrict-button">Register</Link>
        </div>
    </div>
        )}
      </div>
      <div className="sep"></div>
      <div className="sep-con">
        {/* <p>please be mindful of the companion you choose to travel</p> */}
        <img src="../public/motor.png" alt="" />
        <div className="sep-con2">
        <span>Support the Go-green Movement</span>
        <span>by joining our platform</span>
        <span>to travel sustainably</span>
        </div>
      </div>
      <div className="sep"></div>
      <div className="sep-con">
        {/* <p>please be mindful of the companion you choose to travel</p> */}
        <div className="sep-con22">
        <span>Hey folks!!</span>
        <span>Want to cutdown your travelling expances?</span>
        <span>Then explore with Coride</span>
        </div>
        <img src="../public/car1.png" alt="" className="sep-con22img"/>
      </div>
      <div className="sep"></div>
      <Footer/>
    </div>
  );
};

export default Home;
