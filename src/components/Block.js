import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import Theme from "./Theme";
import defaultStyle from "../styles/Block";

class Block extends Component {
  render() {
    const { classes, label, children, primary, style, className } = this.props;
    return (
      <div className={classes.block + " " + className} style={style}>
        <div
          className={classNames([
            label ? classes.head : false,
            label && primary ? classes.primary : false
          ])}
        >
          {label && (
            <Typography
              variant="h6"
              className={classNames([
                label && primary ? classes.primary : false
              ])}
            >
              {label}
            </Typography>
          )}
        </div>
        {children}
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Block", defaultStyle))(Block);
