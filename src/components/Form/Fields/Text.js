import React, { Component } from "react";
import ReactDOM from "react-dom";
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
import { faCheck, faExclamationCircle } from "@fortawesome/pro-light-svg-icons";
import settings from "./../settings";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/Text";

class Text extends Component {
  _menuHolder = null;
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      pending: false,
      addFloatKomma: false,
      menuAnchor: null,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    if (this.props.id) {
      this._menuHolder = document.createElement("div");
      this._menuHolder.id = this.props.id + "-menu-holder";
      document.body.appendChild(this._menuHolder);
    }
  }
  componentWillUnmount() {
    if (this._menuHolder) {
      this._menuHolder.remove();
    }
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
  setMenu = anchor => {
    let set = anchor;
    if (anchor) set = ReactDOM.findDOMNode(anchor);
    this.setState({ ...this.state, menuAnchor: set });
  };
  render() {
    const {
      classes,
      id,
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
      placeholder,
      disabled,
      variant,
      helpBlock
    } = this.props;
    const { addFloatKomma, menuAnchor } = this.state;
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
            </InputLabel>
          )}
          <Input
            type={
              type && type !== "number" && !this.props.readOnly ? type : "text"
            }
            onFocus={e => {
              if (this.props.menu) this.setMenu(e.currentTarget);
            }}
            onBlur={e => {
              //if (this.props.menu) this.setMenu(null);
            }}
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
                classes.inputBase,
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
          <div className={classes.stateHolder}>
            {this.state.pending && (
              <CircularProgress
                className={classNames([classes.state, classes.default])}
                size={14}
              />
            )}
            {isSuccess && (
              <FontAwesomeIcon
                className={classNames([classes.state, classes.success])}
                icon={faCheck}
              />
            )}
            {hasError && (
              <FontAwesomeIcon
                className={classNames([classes.state, classes.danger])}
                icon={faExclamationCircle}
              />
            )}
          </div>
          {!!menuAnchor && (
            <Menu
              classes={classes}
              anchor={menuAnchor}
              menu={this.props.menu}
              port={this._menuHolder}
              id={id}
              onClose={() => this.setMenu(null)}
            />
          )}
        </FormControl>
        {!hasError &&
          (Boolean(helpBlock) && (
            <Typography className={classes.helpBlock} variant="caption">
              {helpBlock}
            </Typography>
          ))}
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

const maxHeight = 224;
const minWidth = 250;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.getDimensions() };
  }
  componentWillMount() {
    //block scrolling here
    if (window.innerHeight < document.body.scrollHeight)
      document.body.style.paddingRight = "15px";
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    //block scrolling here
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, ...this.getDimensions() });
  };
  getDimensions = () => {
    const dimensions = this.props.anchor.getBoundingClientRect();
    let top = dimensions.y + dimensions.height;

    if (window.innerHeight < top + maxHeight + 18)
      top = window.innerHeight - maxHeight - 18;
    return {
      top: top,
      left: dimensions.x,
      width: dimensions.width
    };
  };
  render() {
    const { classes, port } = this.props;
    const element = (
      <div className={classes.overlayBackground}>
        <div className={classes.overlayBackdrop} onClick={this.props.onClose}>
          <div
            className={classes.overlay}
            style={{
              top: this.state.top,
              left: this.state.left,
              width: this.state.width,
              maxHeight,
              minWidth: minWidth,
              maxWidth: "100%"
            }}
          >
            {this.props.menu}
          </div>
        </div>
      </div>
    );
    return ReactDOM.createPortal(element, port);
  }
}

export default withStyles(Theme.getStyle("Form/Fields/Text", defaultStyle))(
  Text
);
