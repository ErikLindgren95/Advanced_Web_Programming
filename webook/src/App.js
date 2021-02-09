import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./App.css";
import home from "./pages/home";
import login from "./pages/login";
import profile from "./pages/profile";
import { connect } from "react-redux";
import { authUser, unAuthUser } from "./redux/auth/auth.actions";
import Navbar from "./components/Navbar";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles.json";

class App extends Component {
  render() {
    const {classes} = this.props; 
    const { authenticated, authUser, unAuthUser } = this.props;

    (function () {
      const token = localStorage.Token;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          delete axios.defaults.headers.common["Authorization"];
          unAuthUser();
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          authUser();
        }
      }
    })();
    return authenticated ? (
      <div className={classes.App}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/profile" component={profile} />
              <Route exact path="/logout" component={App} />
            </Switch>
          </div>
        </Router>
      </div>
    ) : (
      <div className="Login">
        <Router>
          <div className="container">
            <Switch>
              <Route path="/" component={login} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authUser: () => dispatch(authUser()),
  unAuthUser: () => dispatch(unAuthUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
