import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";



function LandingPage () {

  // function signIn(){
  //   //onclick redirect
  // }
  // function signUp(){
  //   //onclik redirect
  // }

  return (
    <>
    <div className="centerme">
    <div>SignBee Logo</div>
    <br/>
    <br/>
    <div className="landingbody">
    <Link className="aboutlink" to="/about"> <h2>SIGNBEE</h2></Link>
    <br/>
    <br/>
    <div>
    <a href="/signin">
    <Button variant="contained" color="primary">Sign In</Button></a></div>
    <br/>
    <div>
    <a href="/signup">
    <Button variant="contained" color="primary">Create Account</Button></a></div></div>
    </div>
    </>

  )
}

export default LandingPage;
