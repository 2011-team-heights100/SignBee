import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value);
      history.push("/dashboard");
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
    }
    setLoading(false);
  }

// sign up only takes email and password
  //this infor needs to be sent only have the the account is created
// var user = firebase.auth().currentUser;
// user.updateProfile({
//   firstName: firstNameRef.current.value,
//   lastName: lastNameRef.current.value
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });


  return (
    <>
      <div className="centerme">
    <div>SignBee Logo</div>
    <br/>
    <br/>
    <div className="formdiv">
      <h2>SIGNBEE</h2>
      {error && <div>{error}</div>}
      <form className="veritcalform" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
        <br/>
        <input type="text" ref={firstNameRef} />
        <br/>
      <label htmlFor="lstName">Last Name</label>
        <br/>
        <input type="text" ref={lastNameRef} />
        <br/>
      <label htmlFor="email">Email</label>
        <br/>
        <input type="email" ref={emailRef} />
        <br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password" ref={passwordRef} />
        <br/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <br/>
        <input type="password" ref={passwordConfirmRef} />
        <br/>
        <br/>
        <Button variant="contained" color="primary"  type="submit" disabled={loading}>
          Sign Up
        </Button>
      </form>
      <br/>
      <div>
    <a href="/">
    <Button variant="contained" color="primary">Back</Button></a></div>
    </div></div>
    </>
  );
}
