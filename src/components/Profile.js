import React from "react";
import { Link } from "react-router-dom";

const Profile = ()=>{


  return (
    <div>

    <div className="title">
      <h1>SIGNBEE</h1>
      </div>
        <div>User Info</div>
         <p>details here</p>

        <Link to="/dashboard">Back</Link>

    </div>
  )
}


export default Profile
