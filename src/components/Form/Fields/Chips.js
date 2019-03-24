import React, { Component } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-light-svg-icons/faCheck";
import { faTrash } from "@fortawesome/pro-light-svg-icons/faTrash";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";
import { faPlus } from "@fortawesome/pro-light-svg-icons/faPlus";
import {
  Grid,
  Chip,
  Menu,
  MenuItem,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ButtonsComponents, FormComponents } from "../../../index";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/Chips";

class SelectExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsToConfirm: [],
      add: null
    };
  }
  change = values => {
    const { onChange } = this.props;
    onChange(values);
  };
  closeMenu = () => {
    this.setState({ ...this.state, add: null });
  };
  getContent = (label, value, confitmDelete) => {
    const { optionsToConfirm } = this.state;
    const { classes, onChange, readOnly } = this.props;
    return readOnly || optionsToConfirm.indexOf(value) === -1 ? (
      <span>
        {label}
        {!readOnly && (
          <FontAwesomeIcon
            icon={faTrash}
            style={{
              margin: "0px 0px 0px 10px",
              cursor: "pointer"
            }}
            onClick={this.setConfirmDeleteFactory(value, true)}
          />
        )}
      </span>
    ) : (
      <span>
        Wollen Sie <b>{label}</b> löschen?
        <span
          style={{
            margin: "0px 0px 0px 10px"
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            style={{ margin: "0px 0px 0px 0px", cursor: "pointer" }}
            className={classes.deleteCheck}
            onClick={this.setDeleteFactory(value)}
          />
          <FontAwesomeIcon
            icon={faTimes}
            style={{ margin: "0px 0px 0px 10px", cursor: "pointer" }}
            onClick={this.setConfirmDeleteFactory(value, false)}
          />
        </span>
      </span>
    );
  };
  setAddValueFactory = value => {
    const { change, closeMenu } = this;
    return () => {
      change([...this.props.value, value]);
      closeMenu();
    };
  };
  setConfirmDeleteFactory = (value, setTo) => {
    return () => {
      let newState = { ...this.state };
      if (setTo)
        newState.optionsToConfirm = [...this.state.optionsToConfirm, value];
      else
        newState.optionsToConfirm = [...this.state.optionsToConfirm].filter(
          item => item !== value
        );
      this.setState(newState);
    };
  };
  setDeleteFactory = value => {
    const { change, setConfirmDeleteFactory, props } = this;
    const removeFromConfirmDeleteList = setConfirmDeleteFactory(value);
    return () => {
      change([...props.value.filter(item => item !== value)]);
      removeFromConfirmDeleteList();
    };
  };
  render() {
    const {
      classes,
      xs,
      sm,
      md,
      lg,
      xl,
      options,
      value,
      primary,
      variant,
      readOnly,
      pending,
      justify
    } = this.props;
    const { Fab } = ButtonsComponents;
    const { optionsToConfirm, add } = this.state;
    let inActiveOptions = [];
    const activeOptions = options.filter(item => {
      const itemValue = typeof item === "object" ? item.value : item;
      const filter = value.indexOf(itemValue) > -1;
      if (!filter) inActiveOptions.push(itemValue);
      return filter;
    });

    return (
      <Grid item {...{ xs, sm, md, lg, xl }}>
        <Grid
          container
          justify={justify === "right" ? "flex-end" : "flex-start"}
        >
          {activeOptions.map(item => {
            let label = item;
            let value = item;
            if (typeof item === "object") {
              value = item.value;
              label = label.label;
            }
            const confirmDelete = readOnly
              ? false
              : optionsToConfirm.indexOf(value) > -1;
            const content = this.getContent(label, value, confirmDelete);
            return (
              <Chip
                key={value}
                className={classNames([
                  classes.chips,
                  confirmDelete ? classes.delete : ""
                ])}
                label={content}
                color={primary && !confirmDelete ? "primary" : "default"}
                variant={
                  confirmDelete ? "outlined" : variant ? variant : "default"
                }
              />
            );
          })}
          {!readOnly && activeOptions.length < options.length && !pending && (
            <Fab
              aria-owns={add ? "add-options" : undefined}
              aria-haspopup="true"
              variant="success"
              icon={faPlus}
              onClick={event => {
                this.setState({ ...this.state, add: event.currentTarget });
              }}
            />
          )}
          {!readOnly &&
            activeOptions.length < options.length &&
            Boolean(add) &&
            !pending && (
              <Menu
                id="simple-menu"
                anchorEl={add}
                open={Boolean(add)}
                onClose={this.closeMenu}
                classes={{ paper: classes.addMenu }}
              >
                {inActiveOptions.map(item => {
                  const label = typeof item === "object" ? item.label : item;
                  const value = typeof item === "object" ? item.value : item;
                  return (
                    <MenuItem
                      key={value}
                      onClick={this.setAddValueFactory(value)}
                    >
                      {label}
                    </MenuItem>
                  );
                })}
              </Menu>
            )}
          {pending && (
            <CircularProgress className={classes.pending} size={22} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Theme.getStyle("Form/Fields/Select", defaultStyle))(
  SelectExport
);
