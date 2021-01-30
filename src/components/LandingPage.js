import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";

import React from "react";

export default function LandingPage() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/app" component={App} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
