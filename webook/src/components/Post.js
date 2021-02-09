import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles.json";
import axios from "axios";
import { connect } from "react-redux";

import moment from "moment";
import { setPostList } from "../redux/post/post.actions";
//Material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { text } from "plotly.js-basic-dist";

class Post extends Component {
  state = {
    url: null,
  };

  componentDidMount() {
    console.log(this.props.postData.userHandle);
    axios
      .get(`/user/${this.props.postData.userHandle}`)
      .then((res) => {
        this.setState({
          url: res.data.imageUrl,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRemove(event) {
    event.preventDefault();
    const id = this.props.postData.postId;
    axios
      .delete(`/post/${id}`)
      .then((response) => {
        const posts = this.props.posts;
        for (let i in posts) {
          if (posts[i].postId === id) {
            posts.splice(i, 1);
          }
        }
        this.props.setPostList(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  render() {
    const {
      classes,
      postData: { body, createdAt, userHandle, symbol },
    } = this.props;
    return (
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item sm={10} xs={12}>
            <Grid container>
              <Grid item>
                <Avatar className={classes.media} src={this.state.url} />
              </Grid>
              <Grid item>
                <CardContent className={classes.content}>
                  <Typography variant="h5">
                    {`${userHandle} (${symbol})`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {body}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item sm={2} xs={4}>
            {this.props.handle === userHandle && (
              <Button
                className={classes.remove_card_button}
                onClick={(e) => this.handleRemove(e)}
                component={Link}
                to="/profile"
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  handle: state.user.handle,
  posts: state.post.posts,
});
const mapDispatchToProps = (dispatch) => ({
  setPostList: (input) => dispatch(setPostList(input)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
