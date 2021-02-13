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
import GameSummary from "./GameSummary"
import GameplayText from "./GameplayText";
import ResetPassword from "./ResetPassword"
import Learn from "./Learn";

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
							<Route exact path="/">
								{isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
							</Route>
							<Route path="/signup">
								{isLoggedIn ? <Redirect to="/dashboard" /> : <SignUp />}
							</Route>
							<Route path="/signin">
								{isLoggedIn ? <Redirect to="/dashboard" /> : <SignIn />}
							</Route>
							<Route path="/app">
								{isLoggedIn ? <App /> : <Redirect to="/" />}
							</Route>
							<Route path="/learn">
								{isLoggedIn ? <Learn /> : <Redirect to="/" />}
							</Route>
							<Route path="/dashboard">
								{isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
							</Route>
							<Route path="/updateprofile">
								{isLoggedIn ? <UpdateProfile /> : <Redirect to="/signin" />}
							</Route>
							<Route path="/gameplaytext">
								{isLoggedIn ? <GameplayText /> : <Redirect to="/" />}
							</Route>
							<Route path="/gamesummary" component={GameSummary} />
							<Route path="/resetpassword" component={ResetPassword} />
							<Route path="/about" component={About} />
						</Switch>
					</AuthProvider>
				</UserProvider>
			</Router>
		</ThemeProvider>
	);
}
