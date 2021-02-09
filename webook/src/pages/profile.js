import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Post from "../components/Post";
import ProfileInfo from "../components/ProfileInfo";
import styles from "../styles.json";
import { setPostList} from "../redux/post/post.actions";

//Material-ui imports
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


class profile extends Component {
  componentDidMount() {
    axios
      .get(`/posts/user/${this.props.handle}`)
      .then((res) => {
        this.props.setPostList(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  componentDidUpdate(prevProps) {
    if (Object.keys(this.props.posts).length !== Object.keys(prevProps.posts).length )
    {
      axios
      .get(`/posts/user/${this.props.handle}`)
      .then((res) => {
        this.props.setPostList(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
}

displayPosts() {
  const posts = this.props.posts
   return (posts.map((post) => {return <Post key={post.postId} postData={post}/>}))
}

  render() {
    let recentPosts = this.props.posts ? (
      this.displayPosts()
    ) : (
      <CircularProgress />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={3} xs={6}>
          <ProfileInfo />
        </Grid>
        <Grid item sm={6} xs={12}>
          {recentPosts === null ? (
            <div>You havent posted anything yet</div>
          ) : (
            <div>{recentPosts}</div>
          )}
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  handle: state.user.handle,
  posts: state.post.posts
});

const mapDispatchToProps = (dispatch) => ({
  setPostList: (input) => dispatch(setPostList(input))
}); 
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(profile));
