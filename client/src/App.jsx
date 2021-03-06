import React, { Component } from "react";

import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import PersonalPage from "./PersonalPage";
import MissionPage from "./MissionPage";
import GalleryPage from "./GalleryPage";
import SpecificPersonPage from "./SpecificPersonPage";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/mission" component={MissionPage} />
          <Route exact path="/me" component={PersonalPage} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route
            exact
            path="/person/:personId"
            component={SpecificPersonPage}
          />
          <Route exact path="/404" component={<p>Page not found</p>} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
  // }
}

export default App;
