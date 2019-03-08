import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Timer from "../../components/Timer";

const overrideStyle = {};

class TimerWrapper extends Component {
  render() {
    const { classes } = this.props;
    return <Timer />;
  }
}

export default withStyles(overrideStyle)(TimerWrapper);
