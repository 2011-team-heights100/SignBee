import React from "react";
import { Link } from "react-router-dom";

const About = ()=>{


  return (
    <div>

    <div className="title">
      <h1>SIGNBEE</h1>
      </div>
        <div>About</div>
         <p>why the app exist</p>
         <p>Create by:</p>
         <ul>
           <li>(Gloria)
           </li>
           <li>
             Julia
           </li>
           <li>
             Leon
           </li>
           <li>
             Naomi
           </li>
         </ul>
        <Link to="/">Back</Link>

    </div>
  )
}


export default About
