import React, { Component } from "react";
import styles from "../styles.json";
import axios from "axios";
import { connect } from "react-redux";

//Material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


class NewsPosts extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
  }

  async loadItems(){
    const response = await axios({
        "method":"GET",
        "url":"https://yahoo-finance-free.p.rapidapi.com/v2/finance/news",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"yahoo-finance-free.p.rapidapi.com",
        "x-rapidapi-key":"00ceb5bc50msh3647c4cfdf5c539p12f0d3jsn6c70b1688690",
        "useQueryString":true
        },"params":{
        "symbols":`${this.props.symbol}`
        }
        })
        .then((response)=>{
            return response.data.Content.result;
          console.log(response)
        })
        .catch((error)=>{
          console.log(error)
        })
  }
  createItems = (classes) => {
      this.loadItems();
      return this.state.data.map((post) => {
          return(
            <Card className={classes.card}>
            <Grid container spacing={1}>
              <Grid item sm={10} xs={12}>
                    <CardContent className={classes.content}>
                      <Typography variant="h5">
                        {`${post.title}`}
                      </Typography>
                    </CardContent>
                  </Grid>
                <Grid item>
                <CardContent className={classes.content}>
                  <Typography variant="body1" color="textSecondary">
                    {post.summary}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          )
      })
  }

  render() {
    const {classes} = this.props;
    return (
        <div>
            {this.createItems(classes)}
        </div>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.chart.symbol
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(NewsPosts));

