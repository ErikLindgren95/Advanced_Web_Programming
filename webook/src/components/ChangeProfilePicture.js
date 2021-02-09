import React, { Component } from "react";
import axios from "axios";
import styles from "../styles.json"

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { DropzoneDialog } from "material-ui-dropzone";

class ChangeProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    let formData = new FormData();
    formData.append("image", files[0], files[0].name)
    for (var value of formData.values()) {
      console.log(value.name); }

    axios
      .post("/images", formData)
      .then((res) => {
        this.setState({
          open: false,
        });
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      files: files,
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen.bind(this)} className={classes.button} >
          Change profile image
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/png"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
          filesLimit={1}
        />
      </div>
    );
  }
}
export default withStyles(styles)(ChangeProfilePicture);