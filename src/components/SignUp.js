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
		} catch (error) {
			setError(`${error.message}`);
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<>
			<div className="centerme">
				<div>
					<img
						src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
						id="bee"
						alt="beeLogo"
					/>
				</div>
				<br />
				<div className="formdiv">
					<Typography variant="h2">SIGN UP</Typography>
					{error && <div>{error}</div>}
					<form className="veritcalform" onSubmit={handleSubmit}>
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
