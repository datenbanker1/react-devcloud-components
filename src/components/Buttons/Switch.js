import React, { Component } from "react";
import { Switch as MaSwitch, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/Button";

class Switch extends Component {
  state = { pending: false };
  onChange = async value => {
    if (this.props.instant) {
      this.setState({ ...this.state, pending: true });
      await Promise.resolve(this.props.onChange(value));
      this.setState({ ...this.state, pending: false });
    } else {
      this.props.onChange(value);
    }
  };
  render() {
    const {
      classes,
      variant = "primary",
      style,
      value,
      readOnly,
      disabled,
      override = {}
    } = this.props;

    if (this.state.pending && this.props.instant)
      return (
        <span className={classes.switchPending}>
          <CircularProgress style={{ margin: "10px" }} size={16} />
        </span>
      );

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
          if (!readOnly) this.onChange(Boolean(event.target.checked));
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
