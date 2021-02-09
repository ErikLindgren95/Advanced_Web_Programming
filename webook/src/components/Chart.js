import React, { Component } from "react";
import ChartSearchBar from "./ChartSearchbar";
import { connect } from "react-redux";
import styles from "../styles.json"


//Plotly imports
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

//Material-ui imports
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const Plot = createPlotlyComponent(Plotly);

class Chart extends Component {
  state = {
    date: [],
    price: [],
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this.fetchData();
    }
  }

  fetchData() {
    const apiKey = "5KWLLDXCF5UZV6L8";
    let symbol = this.props.symbol;
    let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;
    let xValues = [];
    let yValues = [];

    fetch(apiCall)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          xValues.push(key);
          yValues.push(data["Time Series (Daily)"][key]["1. open"]);
        }
        this.setState({
          date: xValues,
          price: yValues,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="chart">
        <ChartSearchBar />
        <Plot
          data={[
            {
              x: this.state.date,
              y: this.state.price,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
            },
          ]}
          layout={{ width: 600, height: 500, title: this.props.companyName }}
        />
        <Typography variant="body2">
          {this.props.description}
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.chart.symbol,
  companyName: state.chart.name,
  description: state.chart.description,
});

export default connect(mapStateToProps)(withStyles(styles)(Chart));
