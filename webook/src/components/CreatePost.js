import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios"
import styles from "../styles.json"
import { setPostList } from "../redux/post/post.actions";

//Material-ui imports
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';


class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      errors: {},
      open: false,
      content: ""
    };
  }
  handleOpen = () => {
    this.setState({
      open: true,
      content:""
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      content:""
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newPost = {
      body: this.state.content,
      symbol: this.props.symbol
     
    };
    axios
      .post("/posts", newPost)
      .then((res) => {
        const postList = this.props.posts
        postList.unshift(res.data)
        this.props.setPostList(postList);
        this.setState({
          loading: false,
          open:false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: error.response.data,
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
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Create a post
          </Typography>
        </CardContent>
        <CardActionArea onClick={this.handleOpen}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Whats on your mind?
            </Typography>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="What's on your mind?"
              type="text"
              className={classes.TextField}
              value={this.state.content}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" disabled={this.state.content === ""}> 
              Submit
              {this.state.loading && (
                    <CircularProgress size={30}className ={classes.progress}/>
                )}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.chart.symbol,
  posts: state.post.posts
});

const mapDispatchToProps = (dispatch) => ({
  setPostList: (input) => dispatch(setPostList(input)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CreatePost));
