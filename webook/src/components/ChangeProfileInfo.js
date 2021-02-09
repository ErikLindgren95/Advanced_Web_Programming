import React, { Component } from "react";
import styles from "../styles.json"
import axios from "axios";
import { connect } from "react-redux";
import {changeAboutUser} from "../redux/user/user.actions"

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

class ChangeProfileInfo extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      open: false,
      about: "",
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
    const info = {
      aboutMe: this.state.about,
    };
    this.props.changeAboutUser(info)
    axios
    .post("/user", info)
    .then(() => {
      this.props.changeAboutUser(info)
      this.setState({
        loading: false,
        open:false
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        loading: false,
      });
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Button
          className={classes.button}
          onClick={this.handleOpen}
        >
        Change profile info
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.formTitle}>Change profile info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="about"
              name="about"
              label="Change: About me"
              type="text"
              className={classes.TextField}
              value={this.state.about}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary"> 
             Change info
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
  
  const mapDispatchToProps = (dispatch) => ({
    changeAboutUser: (input) => dispatch(changeAboutUser(input)),
  });
  


export default connect(null, mapDispatchToProps)(withStyles(styles)(ChangeProfileInfo));
