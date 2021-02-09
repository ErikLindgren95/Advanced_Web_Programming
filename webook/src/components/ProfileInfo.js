import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import ChangeProfileInfo from "./ChangeProfileInfo";
import ChangeProfilePicture from "./ChangeProfilePicture";
import styles from "../styles.json";
import moment from "moment"

//Material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';



class ProfileInfo extends Component {
  componentDidMount() {
    axios
      .get("/user")
      .then((res) => {
        this.props.setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.profileCard}>
        <Avatar
                        alt="Profile Image"
                        src={this.props.imageUrl}
                        className={classes.profileMedia}
                      />
        <CardContent className={classes.content}>
          <Typography variant="h5" align="center">
            {this.props.handle}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Joined: {moment(this.props.joined).format("YY-MM-DD")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            About: {this.props.about}
          </Typography>
        </CardContent>
        <ChangeProfileInfo />
        <ChangeProfilePicture />
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  joined: state.user.createdAt,
  about: state.user.aboutMe,
  handle: state.user.handle,
  imageUrl: state.user.imageUrl
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfileInfo));
