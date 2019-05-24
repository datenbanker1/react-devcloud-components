import React, { Component } from "react";
import { Switch as MaSwitch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/Button";

class Switch extends Component {
  render() {
    const {
      classes,
      variant = "primary",
      style,
      value,
      onChange,
      readOnly,
      disabled,
      override = {}
    } = this.props;
    return (
      <MaSwitch
        classes={{
          ...override,
          root: classNames([classes.switchRoot, override.root]),
          icon: classNames([
            classes.switchIcon,
            !readOnly ? "" : classes.switchIconReadOnly,
            override.icon
          ]),
          switchBase: classNames([classes.switchBase, override.switchBase])
        }}
        checked={value}
        onChange={event => {
          if (!readOnly) onChange(Boolean(event.target.checked));
        }}
        value={"switch"}
        color={variant}
        disabled={!!disabled}
        variant="contained"
        {...{ style }}
      />
    );
  }
}

export default withStyles(Theme.getStyle("Buttons/Button", defaultStyle))(
  Switch
);
