import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";

import React from "react";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import UpdateProfile from "./UpdateProfile";
import About from "./About";

export default function Routes() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/signup" component={SignUp} />
					<Route path="/signin" component={SignIn} />
					<Route path="/app" component={App} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/updateprofile" component={UpdateProfile} />
					<Route path="/about" component={About} />

				</Switch>
			</AuthProvider>
		</Router>
	);
}
