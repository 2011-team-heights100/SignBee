import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function ResetPassword() {
  const {resetPassword} = useAuth()
	const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  

	async function handleSubmit(e) {
		e.preventDefault();

		try {
      setMessage("")
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("A password reset link has buzzed into your inbox!")
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
				<br />
				<br />
				<div className="formdiv">
					<Typography variant="h2">RESET</Typography>
					{error && <Alert severity="error">{error}</Alert>}
					{message && <Alert severity="success">{message}</Alert>}
					<form onSubmit={handleSubmit}>
						<TextField type="email" label="Email" inputRef={emailRef} />
						<br />
						<Button type="submit" disabled={loading}>
							Send Email
						</Button>
					</form>
					<Button variant="outlined" onClick={() => history.push("/signin")}>
						Back
					</Button>
					<br />
					<Link to="/signup">Need an Account? Sign Up</Link>
				</div>
			</div>
		</>
	);
}
