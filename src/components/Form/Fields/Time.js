import React, { Component } from "react";
import classNames from "classnames";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faLockAlt
} from "@fortawesome/pro-light-svg-icons";
import settings from "./../settings";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/Date";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      pending: false,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value, success: false, pending: !!this.props.instant });
    if (this.timer) window.clearTimeout(this.timer);
    if (this.props.instant)
      this.timer = window.setTimeout(async () => {
        const success = await Promise.resolve(
          this.props.onChange(value || null)
        );
        this.setState({ ...this.state, success, pending: false });
        if (this.state.success) {
          window.setTimeout(() => {
            this.setState({ ...this.state, success: false });
          }, settings.successTime);
        }
      }, settings.delay);
    else this.props.onChange(value || null);
  }
  render() {
    const {
      classes,
      xs,
      sm,
      md,
      lg,
      xl,
      readOnly,
      disabled,
      variant
    } = this.props;
    const hasError =
      this.props.error && !this.props.readOnly && !this.state.pending;
    const isSuccess =
      this.state.success && !this.props.readOnly && !this.state.pending;

    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <FormControl className={classes.formControl}>
          <InputLabel
            className={classNames([
              classes.label,
              hasError ? classes.labelError : false
            ])}
            classes={{
              root: variant === "fullField" && classes.fullFieldLabel,
              shrink: variant === "fullField" && classes.fullFieldLabelShrink
            }}
          >
            {this.props.label}
            {this.state.pending && (
              <CircularProgress
                className={classes.default}
                style={{ marginLeft: "5px", display: "inline-block" }}
                size={13}
              />
            )}
            {readOnly && (
              <FontAwesomeIcon
                className={classes.default}
                style={{ marginLeft: "5px" }}
                icon={faLockAlt}
              />
            )}
            {hasError && (
              <FontAwesomeIcon
                className={classes.danger}
                style={{ marginLeft: "5px" }}
                icon={faExclamationCircle}
              />
            )}
            {isSuccess && (
              <FontAwesomeIcon
                className={classes.success}
                style={{ marginLeft: "5px" }}
                icon={faCheck}
              />
            )}
          </InputLabel>
          <Input
            type={this.props.readOnly ? "text" : "time"}
            className={classNames([
              variant !== "fullField"
                ? isSuccess
                  ? classes.inputSuccess
                  : hasError
                  ? classes.inputError
                  : readOnly
                  ? classes.inputReadonly
                  : classes.input
                : readOnly
                ? classes.inputReadonly
                : classes.fullFieldRoot
            ])}
            classes={{
              input:
                variant === "fullField" && !readOnly && classes.fullFieldInput
            }}
            onChange={this.handleChange}
            value={
              this.props.readOnly ? this.props.value || "-" : this.state.value
            }
            readOnly={readOnly}
            disabled={disabled}
          />
        </FormControl>
        {hasError && (
          <Typography
            className={classNames([hasError ? classes.danger : ""])}
            variant="body2"
            gutterBottom
            style={{ display: "inline" }}
          >
            {this.props.error}
          </Typography>
        )}
      </Grid>
    );
  }
}

export default withStyles(Theme.getStyle("Form/Fields/Time", defaultStyle))(
  Time
);
