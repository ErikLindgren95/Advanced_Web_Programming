import React, { Component } from "react";
import styles from "../styles.json"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { unAuthUser } from "../redux/auth/auth.actions";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

class Logout extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.unAuthUser();
  };
  render() {
    return (
      <div>
        <Button
          color="inherit"
          onClick={this.handleLogout}
          component={Link}
          to="/"
        >
          Logout
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  unAuthUser: () => dispatch(unAuthUser()),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Logout));
