import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography, TextField, FormControl } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
				<div className="logo-container">
					<Link className="aboutlink" to="/about">
						<img
							src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
							id="bee"
							alt="beeLogo"
						/>
					</Link>
				</div>
				<br />
				<br />
				<div className="formdiv">
					<Typography variant="h2">SIGN IN</Typography>
					{error && <Alert severity="error">{error}</Alert>}

					<FormControl>
						<TextField type="email" label="Email" inputRef={emailRef} />
						<TextField
							type="password"
							label="Password"
							inputRef={passwordRef}
						/>
						<br />
						<Button type="submit" disabled={loading} onClick={handleSubmit}>
							Sign In
						</Button>
						<br />
					</FormControl>
					<br />
					<Link to="/signup">Need an Account? Sign Up</Link>
					<br />
					<Link to="/resetpassword">Forgot Password?</Link>
				</div>
			</div>
		</>
	);
}
