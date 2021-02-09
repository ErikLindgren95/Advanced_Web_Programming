import React, { Component } from "react";
import styles from "../styles.json";
import axios from "axios";
import Signup from "../components/Signup"
import { connect } from "react-redux";
import { authUser, unAuthUser } from "../redux/auth/auth.actions";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},

    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/login", userData)
      .then((res) => {
        localStorage.setItem("Token", `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
        this.props.authUser();
      })
      .catch((error) => {
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
      <Grid container className={classes.form}>
        <Grid item/>
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.titleBox}>
            <Typography className={classes.title}>Login</Typography>
          </CardContent>
          <CardContent>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="E-mail"
                className={classes.TextField}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                helperText={errors.error}
                error={errors.error ? true : false}
                className={classes.TextField}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="outlined"
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                    <CircularProgress size={30}className ={classes.progress}/>
                )}
              </Button>
            </form>
           <Signup/>
          </CardContent>
        </Card>
        <Grid item />
      </Grid>
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

  


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(login));
