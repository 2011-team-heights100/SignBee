import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { ThemeProvider } from "@material-ui/styles";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";

import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar"
import theme from "../contexts/Theme"

export default function Routes() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AuthProvider>
					<Navbar />
					<Switch>
						<Route path="/signup" component={SignUp} />
						<Route path="/signin" component={SignIn} />
						<Route path="/app" component={App} />
						<Route path="/dashboard" component={Dashboard} />
					</Switch>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
}
