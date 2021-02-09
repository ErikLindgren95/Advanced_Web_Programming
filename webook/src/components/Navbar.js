import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import styles from "../styles.json"

//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

class Navbar extends Component {
  render() {
    const {classes} = this.props; 
    return (
      <div>
        <AppBar className={classes.navbar}>
          <Toolbar >
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Logout />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
