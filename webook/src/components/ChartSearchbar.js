import React, { Component } from "react";
import { connect } from "react-redux";
import { setSymbol, setName, setDescription} from "../redux/chart/chart.action";
import styles from "../styles.json"

//Material-ui imports
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import withStyles from "@material-ui/core/styles/withStyles";

class ChartSearchBar extends Component {
  state = {
    data: [],
  };
  onChange = (event, value) => {
    const apiKey = "5KWLLDXCF5UZV6L8";
    let apiCall = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${value}&apikey=${apiKey}`;
    if(value) {
      fetch(apiCall)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data){
          this.props.setSymbol(data["Symbol"])
          this.props.setName(data["Name"])
          this.props.setDescription(data["Description"])
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };

  render() {
    return (
      <div>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={this.state.data}
          onChange={this.onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSymbol: (input) => dispatch(setSymbol(input)),
  setName: (input) => dispatch(setName(input)),
  setDescription: (input) => dispatch(setDescription(input))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ChartSearchBar));
