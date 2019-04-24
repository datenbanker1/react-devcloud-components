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
import defaultStyle from "../../../styles/Form/Fields/Text";

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      pending: false,
      addFloatKomma: false,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
  }

  formatNumber = (value, unify = false) => {
    value = typeof value !== "string" ? "" : value;
    if (unify) return value.split(",").join(".");
    switch (document.documentElement.lang) {
      case "de":
        return value.split(".").join(",");
      default:
        return value.split(",").join(".");
    }
  };
  handleChange(e) {
    const { type } = this.props;
    const unifiedValue = this.formatNumber(e.target.value, true);
    const value = type === "number" ? parseFloat(unifiedValue) : e.target.value;
    this.setState({
      value,
      success: false,
      pending: !!this.props.instant,
      addFloatKomma:
        type === "number" &&
        !unifiedValue.startsWith(".") &&
        unifiedValue.endsWith(".")
    });
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
    else this.props.onChange(value === 0 ? 0 : value || null);
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
      type,
      strict,
      rows,
      label,
      dontShowLock = false,
      placeholder,
      disabled,
      variant,
      helpBlock
    } = this.props;
    const { addFloatKomma } = this.state;
    const hasError =
      this.props.error && !this.props.readOnly && !this.state.pending;
    const isSuccess =
      this.state.success && !this.props.readOnly && !this.state.pending;
    let inputLabel = {};
    if (Boolean(placeholder)) {
      inputLabel.shrink = true;
    }

    let value = this.props.readOnly
      ? this.props.value || "-"
      : strict
      ? this.props.value
      : this.state.value;
    value = value === null ? "" : value;
    if (!readOnly && type === "number" && addFloatKomma)
      value = this.formatNumber(value + ".");
    value = type === "number" ? this.formatNumber(value + "") : value;

    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <FormControl className={classes.formControl}>
          {(label || label === "") && (
            <InputLabel
              {...inputLabel}
              className={classNames([hasError ? classes.labelError : false])}
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
              {readOnly && !dontShowLock && (
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
          )}
          <Input
            type={
              type && type !== "number" && !this.props.readOnly ? type : "text"
            }
            multiline={!!rows}
            rows={rows}
            placeholder={placeholder}
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
              input: classNames([
                variant === "fullField" && !readOnly && classes.fullFieldInput,
                variant === "fullField" && readOnly && classes.fullFieldReadOnly
              ])
            }}
            autoComplete={type === "password" ? "current-password" : "off"}
            onChange={this.handleChange}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
          />
          {hasError ||
            (helpBlock && (
              <Typography className={classes.helpBlock} variant="caption">
                {helpBlock}
              </Typography>
            ))}
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

export default withStyles(Theme.getStyle("Form/Fields/Text", defaultStyle))(
  Text
);
