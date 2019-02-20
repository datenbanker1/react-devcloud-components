import React, { Component } from "react";
import { FormControl } from "@material-ui/core";
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Typography
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt } from "@fortawesome/pro-light-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import settings from "./../settings";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/Radio";

class RadioStatic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      pending: false,
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (!this.props.readOnly) {
      const value = e.target.value;
      const newState = { ...this.state, value };
      this.setState(newState);
      this.props.onChange(value);
    }
  }

  render() {
    const {
      classes,
      xs,
      sm,
      md,
      lg,
      xl,
      options,
      readOnly,
      disabled
    } = this.props;
    const hasError = this.props.error && !readOnly && !this.state.pending;
    const isSuccess = this.state.success && !readOnly && !this.state.pending;
    const value = this.props.readOnly
      ? this.props.value || null
      : this.state.value;
    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <div className="static-form-control">
          <FormControl className={classNames([classes.formControl])}>
            <RadioGroup
              aria-label="reset type"
              value={value}
              onChange={this.handleChange}
            >
              {options.map((option, index) => {
                return (
                  <FormControlLabel
                    key={"radio" + index + option.value}
                    value={option.value}
                    control={
                      <Radio
                        className={classNames([hasError ? classes.danger : ""])}
                        color="primary"
                        disabled={disabled}
                      />
                    }
                    label={
                      <div>
                        {option.label}{" "}
                        {this.props.readOnly && (
                          <FontAwesomeIcon
                            className={classes.default}
                            style={{ marginLeft: "5px" }}
                            icon={faLockAlt}
                          />
                        )}
                      </div>
                    }
                    labelPlacement="end"
                  />
                );
              })}
            </RadioGroup>
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

export default withStyles(Theme.getStyle("Form/Fields/Radio", defaultStyle))(
  RadioStatic
);
