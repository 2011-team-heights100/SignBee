import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";

import React from "react";
import Alphabet from "./game/Alphabet";
import AppDemo from "./AppDemo"
import Titlepage from "./Titlepage";
import DashBoard from "./Dashboard";
import About from "./About";
import Profile from "./Profile";

export default function LandingPage() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Titlepage } />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/app" component={App} />
          <Route path="/alphabet" component={Alphabet} />
          <Route path="/appdemo" component={AppDemo} />
          <Route path="/dashboard" component={DashBoard } />
          <Route path="/about" component={About } />
          <Route path="/profile" component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
