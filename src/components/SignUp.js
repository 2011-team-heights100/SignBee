import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { Button, Typography, TextField, FormControl } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
		console.log(emailRef.current.value);
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				firstNameRef.current.value,
				lastNameRef.current.value
			);
			history.push("/dashboard");
		} catch (err) {
			await setError(`${err.message}`);
			console.log("Error in catch block", err);
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
				<div className="formdiv">
					<Typography variant="h2">SIGN UP</Typography>
					{error && <Alert severity="error">{error}</Alert>}
					<FormControl>
						<TextField type="text" label="First Name" inputRef={firstNameRef} />
						<TextField type="text" label="Last Name" inputRef={lastNameRef} />
						<TextField type="email" label="Email" inputRef={emailRef} />
						<TextField
							type="password"
							label="Password"
							inputRef={passwordRef}
						/>
						<TextField
							type="password"
							label="Confirm Password"
							inputRef={passwordConfirmRef}
						/>
						<Button type="submit" disabled={loading} onClick={handleSubmit}>
							Sign Up
						</Button>
						<Button variant="outlined" onClick={() => history.goBack()}>
							Back
						</Button>
					</FormControl>
				</div>
			</div>
		</>
	);
}
