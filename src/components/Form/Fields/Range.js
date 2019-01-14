import React, { Component } from "react";
import classNames from "classnames";
import { CircularProgress } from "@material-ui/core";
import {
  Grid,
  LinearProgress,
  InputLabel,
  FormControl,
  Typography
} from "@material-ui/core";
import { Slider } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faLockAlt
} from "@fortawesome/pro-light-svg-icons";
import settings from "./../settings";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/Range";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: parseInt(this.props.value, 10)
    };
    this.handelChange = this.handelChange.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
  }

  handelChange(e, value) {
    this.setState({ value, success: false, pending: !!this.props.instant });
    if (this.timer) window.clearTimeout(this.timer);
    if (!!this.props.instant)
      this.timer = window.setTimeout(async () => {
        const success = await Promise.resolve(this.props.onChange(value));
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
    const { classes, xs, sm, md, lg, readOnly } = this.props;
    const hasError = this.props.error && !readOnly && !this.state.pending;
    const isSuccess = this.state.success && !readOnly && !this.state.pending;
    const value = this.props.readOnly
      ? this.props.value || 0
      : this.state.value;
    return (
      <Grid item {...{ xs, sm, md, lg }}>
        <FormControl className={classes.formControl}>
          <InputLabel
            className={classNames([
              classes.label,
              hasError ? classes.labelError : false
            ])}
          >
            {this.props.label} -{" "}
            {this.props.readOnly ? this.props.value || 0 : this.state.value}
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
          <div
            className={
              readOnly ? classes.rangeInputReadOnly : classes.rangeInput
            }
          >
            {readOnly && (
              <LinearProgress
                variant="determinate"
                value={this.props.value * 10}
              />
            )}
            {!readOnly && (
              <Slider
                classes={{
                  track: classes.track,
                  thumb: classNames([
                    classes.button,
                    this.props.min === value ? classes.buttonStart : "",
                    this.props.max === value ? classes.buttonEnd : ""
                  ])
                }}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                value={value}
                onChange={this.handelChange}
              />
            )}
          </div>
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

export default withStyles(Theme.getStyle("Form/Fields/Range", defaultStyle))(
  Range
);
