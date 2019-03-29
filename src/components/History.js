import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSearch
} from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";
import Theme from "./Theme";
import defaultStyle from "../styles/History";

class History extends Component {
  yearFlag = element => {
    const { classes } = this.props;
    return (
      <li key={"history:yearFlag" + element.value}>
        <div className={classes.historyYearFlag}>
          <Typography variant="body2">{element.value}</Typography>
        </div>
      </li>
    );
  };
  defaultListElement = () => {
    return <p>No listElement provided!</p>;
  };
  renderElements(element, index) {
    const type = element.$type || "listElement";
    const { classes } = this.props;
    switch (type) {
      case "yearFlag":
        return (
          <li
            key={"history:yearFlag" + element.year}
            className={classes.historyYearFlagHolder}
          >
            <div className={classes.historyYearFlag}>
              <Typography variant="body2">{element.year}</Typography>
            </div>
          </li>
        );
      default: {
        const fn = this.props.listElement || this.defaultListElement;
        return (
          <li
            className={classes.historyElement}
            key={"history-" + (element.id || index)}
          >
            <div className={classes.historyListItemIndicator}>
              <div className={classes.historyListItemCircleHolder}>
                <span className={classes.historyListItemCircle} />
              </div>
            </div>
            <div className={classes.historyElementPaper}>{fn(element)}</div>
          </li>
        );
      }
    }
  }
  render() {
    const { classes, pending, error, elements } = this.props;
    if (pending)
      return (
        <div className={classes.pendingHolder}>
          <CircularProgress />
          <Typography variant="body2">History wird geladen...</Typography>
        </div>
      );
    else if (error)
      return (
        <div className={classNames([classes.pendingHolder, classes.danger])}>
          <FontAwesomeIcon
            className={classes.stateIcon}
            icon={faExclamationTriangle}
          />
          <Typography classes={{ root: classes.danger }} variant="body2">
            Ein Fehler ist aufgetreten.
          </Typography>
        </div>
      );
    else if (!pending && !elements.length)
      return (
        <div className={classNames([classes.pendingHolder, classes.default])}>
          <FontAwesomeIcon className={classes.stateIcon} icon={faSearch} />
          <Typography classes={{ root: classes.default }} variant="body2">
            Keine Events gefunden.
          </Typography>
        </div>
      );
    return (
      <div className={classes.historyHolder}>
        <ul className={classes.historyList}>
          {elements.map((element, index) => {
            return this.renderElements(element, index);
          })}
        </ul>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("History", defaultStyle))(History);
