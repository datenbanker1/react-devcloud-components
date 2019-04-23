import React, { Component } from "react";
import classNames from "classnames";
import {
  CircularProgress,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem
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
import Text from "./Text";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/MultiSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
let MenuProps = {
  PaperProps: {
    style: {
      border: "1px solid #ececec",
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      whiteSpace: "normal"
    }
  }
};
class SelectExport extends Component {
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
    this.setState({
      ...this.state,
      success: false,
      pending: !!this.props.instant,
      value
    });
    if (this.timer) window.clearTimeout(this.timer);
    if (!!this.props.instant)
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
    else this.props.onChange(value);
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
      label,
      placeholder,
      dontShowLock = false,
      override = {},
      options,
      variant
    } = this.props;
    const hasError =
      this.props.error && !this.props.readOnly && !this.state.pending;
    const isSuccess =
      this.state.success && !this.props.readOnly && !this.state.pending;

    if (readOnly) {
      const selectedOption = options.find(
        option =>
          (typeof option === "object" && option.value === this.props.value) ||
          (typeof option !== "object" && option === this.props.value)
      );
      const textValue =
        typeof selectedOption === "object"
          ? selectedOption.label
          : selectedOption;
      return (
        <Text
          {...{ xs, sm, md, lg, xl, readOnly, dontShowLock, disabled, label }}
          value={textValue || ""}
        />
      );
    }
    const value = readOnly ? this.props.value : this.state.value;
    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <div className="instant-form-control">
          <FormControl className={classes.formControl}>
            {(label || label === "") && (
              <InputLabel
                className={classNames([
                  isSuccess ? classes.success : "",
                  hasError ? classes.danger : ""
                ])}
                classes={{
                  root: variant === "fullField" && classes.fullFieldLabel,
                  shrink:
                    variant === "fullField" && classes.fullFieldLabelShrink
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
            )}
            <Select
              style={{
                whiteSpace: "normal"
              }}
              classes={{
                root: override.select,
                selectMenu: classNames([
                  variant === "fullField" && classes.fullFieldSelect,
                  disabled ? classes.disabledCursor : "",
                  placeholder && value === "" ? classes.placeholder : ""
                ])
              }}
              value={placeholder && value === "" ? "placeholder" : value}
              readOnly={readOnly}
              disabled={disabled || readOnly}
              onChange={this.handleChange}
              input={
                <Input
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
                      variant === "fullField" &&
                        !readOnly &&
                        classes.fullFieldInput,
                      override.input
                    ])
                  }}
                />
              }
              MenuProps={MenuProps}
            >
              {!!placeholder && (
                <MenuItem value="placeholder" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {this.props.options.map(option => {
                if (typeof option === "object")
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                else
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
              })}
            </Select>
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
        </div>
      </Grid>
    );
  }
}

export default withStyles(Theme.getStyle("Form/Fields/Select", defaultStyle))(
  SelectExport
);
