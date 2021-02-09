import React, { Component } from "react";
import axios from "axios";
import {setCurrentUser} from "../redux/user/user.actions"
import {setPostList} from "../redux/post/post.actions"
import Post from "../components/Post";
import Chart from "../components/Chart";
import CreatePost from "../components/CreatePost"
import { connect } from "react-redux";
import styles from "../styles.json";

//Material-ui imports
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


class home extends Component {
  
  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol)
    {
      axios
      .get(`/posts/${this.props.symbol}`)
      .then((res) => {
        this.props.setPostList(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  componentDidMount() {
    axios
    .get(`/posts/${this.props.symbol}`)
    .then((res) => {
      this.props.setPostList(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
      axios
      .get("/user")
      .then((res) => {
        this.props.setCurrentUser(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    displayPosts() {
      const posts = this.props.posts
       return (posts.map((post) => {return <Post key={post.postId} postData={post}/>}))
    }
  render() {
    const { classes } = this.props;
    let recentPosts = this.props.posts ? (
      this.displayPosts()
    ) : (
      <CircularProgress />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={6} xs={12}>
          <Chart />
        </Grid>
        <Grid item sm={6} xs={12}>
          <CreatePost/>
          {recentPosts}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.chart.symbol,
  posts: state.post.posts
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setPostList : (input) => dispatch(setPostList(input))
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(home));

