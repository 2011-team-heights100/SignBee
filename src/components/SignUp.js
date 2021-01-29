import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <input type="password" ref={passwordConfirmRef} />
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      <div>
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}
