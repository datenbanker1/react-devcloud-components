import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Timer from "../../components/Timer";

const overrideStyle = {};

class TimerWrapper extends Component {
  render() {
    const { classes } = this.props;
    return <Timer on={{ stopTimer: "TIMER_STOP" }} />;
  }
}

export default withStyles(overrideStyle)(TimerWrapper);
