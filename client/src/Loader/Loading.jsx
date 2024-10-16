import React from "react";
import './Loader.css'
const Loading = () => {
  return (
    <div className="loader-body">
      <l-bouncy
       size="85"
       speed="1.75" 
       color="white" 
     ></l-bouncy>
    </div>
  );
};
 
export default Loading;
