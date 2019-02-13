import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDoubleLeft,
  faChevronDoubleRight,
  faCaretDown
} from "@fortawesome/pro-light-svg-icons";
import { Fab, Typography, Menu, MenuItem, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Theme from "./Theme";
import defaultStyle from "../styles/Pagination";

class Pagination extends Component {
  state = {
    anchorRecordsPerPage: null
  };
  firstPage = () => {
    const { onChange, from } = this.props;
    onChange(from);
  };
  previous = () => {
    const { onChange, current, from } = this.props;
    if (current > from) onChange(current - 1);
  };
  next = () => {
    const { onChange, current, to } = this.props;
    if (current < to) onChange(current + 1);
  };
  lastPage = () => {
    const { onChange, to } = this.props;
    onChange(to);
  };
  changeRecordsPerPage = (event, records) => {
    this.toggleRecordsPerPageMenu(event);
    const { onChangeRecordsPerPage } = this.props;
    onChangeRecordsPerPage(records);
  };
  toggleRecordsPerPageMenu = event => {
    const isOpen = Boolean(this.state.anchorRecordsPerPage);
    if (isOpen) this.setState({ ...this.state, anchorRecordsPerPage: null });
    else
      this.setState({
        ...this.state,
        anchorRecordsPerPage: event.currentTarget
      });
  };
  render() {
    const { toggleRecordsPerPageMenu, changeRecordsPerPage } = this;
    const {
      classes,
      current,
      from,
      to,
      recordsPerPage,
      recordsPerPageOptions
    } = this.props;
    const { anchorRecordsPerPage } = this.state;
    const pages = to - from + 1;
    return (
      <div className={classes.wrapper}>
        <div className={classes.holder}>
          <Grid container size={4}>
            <Grid item xs={12} sm={6} className={classes.recordsPerPageHolder}>
              <Typography
                aria-owns={anchorRecordsPerPage ? "simple-menu" : undefined}
                aria-haspopup="true"
                variant="caption"
                className={classes.RecordsPerPageText}
                onClick={toggleRecordsPerPageMenu}
              >
                Einträge pro Seite {recordsPerPage}{" "}
                {recordsPerPageOptions && recordsPerPageOptions.length && (
                  <FontAwesomeIcon
                    style={{ position: "relative", top: "1px" }}
                    icon={faCaretDown}
                  />
                )}
              </Typography>
              {recordsPerPageOptions && recordsPerPageOptions.length && (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorRecordsPerPage}
                  open={Boolean(anchorRecordsPerPage)}
                  onClose={toggleRecordsPerPageMenu}
                  classes={{ paper: classes.menu }}
                >
                  {recordsPerPageOptions.map(option => (
                    <MenuItem
                      key={"recordsPerPageOption-" + option}
                      onClick={event => changeRecordsPerPage(event, option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Grid>
            <Grid item xs={12} sm={6} className={classes.paginationHolder}>
              <Fab
                classes={{
                  root: classNames([
                    classes.paginationBtn,
                    current <= from
                      ? classes.paginationBtnDisabled
                      : classes.paginationBtnActive
                  ]),
                  label: classes.paginationLabel
                }}
                onClick={this.firstPage}
                color="default"
                variant="round"
              >
                <FontAwesomeIcon icon={faChevronDoubleLeft} />
              </Fab>
              <Fab
                classes={{
                  root: classNames([
                    classes.paginationBtn,
                    current <= from
                      ? classes.paginationBtnDisabled
                      : classes.paginationBtnActive
                  ]),
                  label: classes.paginationLabel
                }}
                onClick={this.previous}
                color="default"
                variant="round"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Fab>
              <Typography className={classes.text} variant="caption">
                {current} von {pages}
              </Typography>
              <Fab
                classes={{
                  root: classNames([
                    classes.paginationBtn,
                    current >= to
                      ? classes.paginationBtnDisabled
                      : classes.paginationBtnActive
                  ])
                }}
                onClick={this.next}
                color="default"
                variant="round"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Fab>
              <Fab
                classes={{
                  root: classNames([
                    classes.paginationBtn,
                    current >= to
                      ? classes.paginationBtnDisabled
                      : classes.paginationBtnActive
                  ])
                }}
                onClick={this.lastPage}
                color="default"
                variant="round"
              >
                <FontAwesomeIcon icon={faChevronDoubleRight} />
              </Fab>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Pagination", defaultStyle))(
  Pagination
);
