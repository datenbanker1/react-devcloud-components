import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Theme from "./Theme";
import defaultStyle from "../styles/SubAppBar";

class SubAppBar extends Component {
  render() {
    const { classes, children } = this.props;
    return <div className={classes.holder}>{children}</div>;
  }
}

export default withStyles(Theme.getStyle("SubAppBar", defaultStyle))(SubAppBar);
