import React, { Component } from "react";
import { Switch as MaSwitch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/Button";

class Switch extends Component {
  onChange = name => event => {
    this.props.onChange(Boolean(event.target.checked));
  };
  render() {
    const {
      classes,
      variant = "primary",
      style,
      value,
      onChange,
      align,
      override = {}
    } = this.props;
    return (
      <MaSwitch
        classes={{
          ...override,
          root: classNames([classes.switchRoot, override.root]),
          icon: classNames([classes.switchIcon, override.icon])
        }}
        checked={value}
        onChange={onChange}
        value={"switch"}
        color={variant}
        variant="contained"
        {...{ style }}
      />
    );
  }
}

export default withStyles(Theme.getStyle("Buttons/Button", defaultStyle))(
  Switch
);
