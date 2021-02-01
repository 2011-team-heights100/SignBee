import React from "react";
import { Link, useHistory } from "react-router-dom";

const Titlepage = ()=>{
  const history = useHistory();
  const signin =()=>{
    history.push("/signin")
  }
  const signout=()=>{
    history.push("/signup")
  }

  return (
    <div className="title">
      <h1>SIGNBEE</h1>
      <div>
        <div>
        <Link to="/about">About</Link>
        </div>
        <br/>
      <button  onClick={signin}>Sign In</button>
      </div>
      <div>
      <button  onClick={signout}>Sign out</button>
      </div>
    </div>
  )
}


export default Titlepage
