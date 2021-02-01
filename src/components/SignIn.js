import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

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
      history.push("/dashboard"); // was app
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>

      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
