import React, { Component } from "react";

import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core";
import MainPage from "./MainPage";

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: "hsl(190, 100%, 42%)",
      light: "hsl(190, 100% 46%)",
      dark: "hsl(190, 100%, 38%)",
    },
    secondary: {
      main: "hsl(355, 78%, 56%)",
      light: "hsl(355, 78%, 52%)",
      dark: "hsl(355, 78%, 60%)",
    },
  },
});
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/404" component={<p>Page not found</p>} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
  // }
}

export default App;
