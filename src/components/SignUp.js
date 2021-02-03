import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField } from "@material-ui/core";

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
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				firstNameRef.current.value,
				lastNameRef.current.value
			);
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
				<br />
				<div className="formdiv">
					<Typography variant="h2">SIGN UP</Typography>
					{error && <div>{error}</div>}
					<form className="veritcalform" onSubmit={handleSubmit}>
						<TextField type="text" label="First Name" ref={firstNameRef} />
						<TextField type="text" label="Last Name" ref={lastNameRef} />
						<TextField type="email" label="Email" ref={emailRef} />
						<TextField type="password" label="Password" ref={passwordRef} />
						<TextField
							type="password"
							label="Confirm Password"
							ref={passwordConfirmRef}
						/>
						<Button type="submit" disabled={loading}>
							Sign Up
						</Button>
					</form>
					<Button variant="outlined" onClick={() => history.push("/")}>
						Back
					</Button>
				</div>
			</div>
		</>
	);
}
