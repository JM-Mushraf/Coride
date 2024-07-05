import React from "react";
import "../components/Search.css";

function Search() {
  return (
    <div className="container">
      <div className="s1">
      <input type="text" placeholder="Enter the Start Location" id="Start"/>
      </div>
      <div className="s1">
      <input type="text" placeholder="Enter Destination" id="dest"/>
      </div>
      <div className="s1">
      <input type="date" id="date"className="nocal styled-date"/>
      </div>
    </div>
  );
}

export default Search;