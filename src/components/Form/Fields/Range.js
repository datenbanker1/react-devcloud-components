import React, { Component } from "react";
import classNames from "classnames";
import { CircularProgress } from "@material-ui/core";
import { Grid, InputLabel, FormControl, Typography } from "@material-ui/core";
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
import { Slider, Handles, Tracks } from "react-compound-slider";

const sliderStyle = {
  position: "relative",
  width: "100%",
  height: 32
};

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Array.isArray(this.props.value)
        ? this.props.value
        : [this.props.value]
    };
    this.handelChange = this.handelChange.bind(this);
    this.ranger = this.ranger.bind(this);
    this.linearProgress = this.linearProgress.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
  }

  handelChange(value) {
    const { disabled } = this.props;
    if (disabled) return;
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

  ranger() {
    const { classes, step, min, max, readOnly, disabled } = this.props;
    const value = readOnly ? this.props.value : this.state.value;
    return (
      <Slider
        rootStyle={sliderStyle} // inline styles for the outer div. Can also use className prop.
        domain={[min, max]}
        step={step}
        values={value}
        onChange={this.handelChange}
        onUpdate={this.handelChange}
        disabled={disabled}
      >
        <div
          className={classNames([classes.rail, disabled && classes.disabled])}
        />
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle, index) => {
                const { id, value, percent } = handle;
                let style = { left: `${percent}%` };
                if (value === min) style.marginLeft = "0px";
                if (value === max) style.marginLeft = "-16px";
                return (
                  <div
                    key={id + "-" + index}
                    style={style}
                    className={classNames([
                      classes.handle,
                      disabled && classes.disabled
                    ])}
                    {...getHandleProps(id)}
                  />
                );
              })}
            </div>
          )}
        </Handles>
        <Tracks right={false} left={value.length === 1}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }, index) => (
                <div
                  key={"track" + id + "-" + index}
                  className={classNames([
                    classes.track,
                    disabled && classes.disabled
                  ])}
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`
                  }}
                  {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    );
  }

  linearProgress() {
    const { classes, value, min, max, disabled } = this.props;
    let style = {};
    if (value.length === 1) {
      style.left = "0%";
      style.right = 100 - (100 / (max - min)) * (value[0] - min) + "%";
    } else {
      style.left = (100 / (max - min)) * (value[0] - min) + "%";
      style.right =
        100 - (100 / (max - min)) * (value[value.length - 1] - min) + "%";
    }
    return (
      <div className={classes.linearProgressWrapper}>
        <div
          className={classNames([
            classes.linearProgessRail,
            disabled && classes.disabled
          ])}
        />
        <div
          style={style}
          className={classNames([
            classes.linearProgressTrack,
            disabled && classes.disabled
          ])}
        />
      </div>
    );
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
      dontShowLock = false
    } = this.props;
    const hasError = this.props.error && !readOnly && !this.state.pending;
    const isSuccess = this.state.success && !readOnly && !this.state.pending;
    const Ranger = this.ranger;
    const LinearProgress = this.linearProgress;

    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <FormControl className={classes.formControl}>
          <InputLabel
            className={classNames([
              classes.label,
              hasError ? classes.labelError : false
            ])}
          >
            {this.props.label} -{" "}
            {this.props.readOnly
              ? this.props.value.join(", ")
              : this.state.value.join(", ")}
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
            {!readOnly && <Ranger />}
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
