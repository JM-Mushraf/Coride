import React, { useEffect } from "react";
import "./CreateTrip.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Autocomplete from "../Components/AutoComplete";
import { run } from "../gemini api/Gemini";
const CreateTrip = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const handleGeminiSubmit = async () => {
    if (formData.startLocation === "" || formData.destination === "") {
      toast.error("Please enter both start and destination");
      return; // Early return if the fields are empty
    }

    try {
      const response = await run(formData.startLocation, formData.destination);
      setGeneratedText(response);
    } catch (error) {
      toast.error("Failed to fetch approximate fare");
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    startLocation: "",
    destination: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/trips/create",
        formData
      );
      toast.success("Trip created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="mcont">
      <div className="cont1-ct">
        <div className="ct">
          <span>Plan</span>
          <span>Trip</span>
        </div>
        <div className="from-ct">
          <div>
            <label htmlFor="date1">Date: </label>
            <input
              type="date"
              id="date1"
              className="ctfi ctfi1"
              name="date"
              value={formData.date}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="time1">Time: </label>
            <input
              type="time"
              id="time1"
              className="ctfi ctfi2"
              name="time"
              value={formData.time}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="sl1">Start Location: </label>
            <input
              type="text"
              id="dest2"
              className="ctfi"
              name="startLocation"
              value={formData.startLocation}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dest1">Destination: </label>
            <input
              type="text"
              id="dest1"
              className="ctfi"
              name="destination"
              value={formData.destination}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
        </div>
        <div className="bt-ct">
          <button onClick={handleSubmit}>Create</button>
        </div>
        <div className="gemini-container">
          <button
            onClick={handleGeminiSubmit}
            style={{
              maxWidth: "100%",
              height: "100%",
              display: "flex",
              alignSelf: "center",
              margin: "5px auto",
            }}
          >
            get approximate fare
          </button>
          <p>
            <span>Fare:</span>
            <span>{generatedText}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
