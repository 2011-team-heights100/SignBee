import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from '../contexts/UserContext'
import firebase from "firebase/app";
import { ThemeProvider } from "@material-ui/styles";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import App from "./App";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import theme from "../contexts/Theme";
import LandingPage from "./LandingPage";
import UpdateProfile from "./UpdateProfile";
import About from "./About";

export default function Routes() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) setIsLoggedIn(true);
			else setIsLoggedIn(false);
		});
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<UserProvider>
					<AuthProvider>
						<Navbar />
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route path="/signup" component={SignUp} />
							<Route path="/signin" >
								{isLoggedIn ? <Redirect to='/dashboard'/> : <SignIn/>}
							</Route>
							<Route exact path="/app" component={App} />
							<Route path="/dashboard">
								{/* {<Dashboard />} */}
								{isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
							</Route>
							<Route path="/updateprofile" component={UpdateProfile} />
							<Route path="/about" component={About} />
						</Switch>
					</AuthProvider>
				</UserProvider>
			</Router>
		</ThemeProvider>
	);
}
