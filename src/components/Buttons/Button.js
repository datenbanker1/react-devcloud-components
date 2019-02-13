import React, { Component } from "react";
import { Button as MaButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/Button";

class Button extends Component {
  render() {
    const {
      classes,
      variant,
      style,
      onClick,
      children,
      override = {}
    } = this.props;
    const className = variant || "default";
    return (
      <MaButton
        className={classNames([
          classes.btn,
          classes[className],
          override.button
        ])}
        variant="contained"
        {...{ style, onClick }}
      >
        {children}
      </MaButton>
    );
  }
}

export default withStyles(Theme.getStyle("Buttons/Button", defaultStyle))(
  Button
);
