import React, { Component } from "react";
import styles from "../styles.json"
import axios from "axios";
import { connect } from "react-redux";
import { authUser, unAuthUser } from "../redux/auth/auth.actions";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {},
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    axios
      .post("/signup", newUser)
      .then((res) => {
        localStorage.setItem("Token", `Bearer ${res.data.userToken}`);
        this.setState({
          loading: false,
          open:false
        });
        this.props.authUser();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: error.response.data,
          loading: false,
        });
        this.props.unAuthUser();
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleOpen}
        >
          Sign in
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.formTitle}>Sign in</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="handle"
              name="handle"
              label="Username"
              type="text"
              helperText={errors.message}
              error={errors.message ? true : false}
              className={classes.TextField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              helperText={errors.error}
              error={errors.error ? true : false}
              className={classes.TextField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              className={classes.TextField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              className={classes.TextField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={this.state.error}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary"> 
              Signup
              {loading && (
                    <CircularProgress size={30}className ={classes.progress}/>
                )}
            </Button>
          </DialogActions>
        </Dialog>
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
  


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));
