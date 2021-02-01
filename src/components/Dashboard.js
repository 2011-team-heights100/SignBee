import React from "react";
import { Link } from "react-router-dom";

const DashBoard = ()=>{


  return (
    <div>

    <div className="title">
      <h1>SIGNBEE</h1>
      </div>
        <div>Select Category</div>
        <Link to="/alphabet">Alphabet</Link>
        <div>Visit Profile</div>
        <Link to="/profile">Profile</Link>
    </div>
  )
}


export default DashBoard
