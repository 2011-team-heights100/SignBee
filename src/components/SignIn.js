import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
    }
    setLoading(false);
  }

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
        <label htmlFor="email">Email</label>
        <br/>
        <input type="email" ref={emailRef} />
        <br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password" ref={passwordRef} />
        <br/>
        <br/>
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          Sign In
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
    //  <div>
    //     Need an account? <Link to="/signup">Sign Up</Link>
    //   </div>
