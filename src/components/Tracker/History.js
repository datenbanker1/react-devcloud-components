import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "../../container/History";
import { CircularProgress, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSearch
} from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";
import Theme from "../Theme";
import defaultStyle from "../../styles/Tracker";

class History extends Component {
  state = {
    pending: true,
    error: false,
    elements: [],
    type: null,
    browsing: {
      start: null,
      next: null
    }
  };
  componentDidMount() {
    const { on, id, type } = this.props;
    this.props.loadElements(on, id, type, this.setElements, this.setError);
  }
  setElements = (elementsLoaded, start, next) => {
    const elements = elementsLoaded.reduce((elements, element, index) => {
      let toReturn = [...elements];
      const currentElementYear = new Date(element.creationDate).getFullYear();
      if (index > 0) {
        const previouseElementYear = new Date(
          elements[index - 1].creationDate
        ).getFullYear();
        if (previouseElementYear > currentElementYear)
          toReturn.push({
            $type: "history:YearFlag",
            value: previouseElementYear
          });
      }
      toReturn.push(element);
      if (index === elementsLoaded.length - 1)
        toReturn.push({
          $type: "YearFlag",
          value: currentElementYear
        });
      return toReturn;
    }, []);
    this.setState({
      ...this.state,
      pending: false,
      error: false,
      elements,
      browsing: { start, next }
    });
  };
  setError = () => {
    this.setState({ ...this.state, pending: false, error: true });
  };
  defaultListElement = event => {
    return (
      <div>
        <Typography variant="body2">
          <b>Req. Id:</b> {event.requestId}
          <br />
          <b>Datum:</b> {event.creationDate}
          <br />
          <b>Fields:</b>{" "}
        </Typography>
        <ul>
          {Object.keys(event.fields).map(field => (
            <li key={"history-" + event.requestId + "-field-" + field}>
              {field}{" "}
              {typeof event.fields[field] === "string" ||
              typeof event.fields[field] === "number"
                ? " => " + event.fields[field]
                : ""}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  historyElement = element => {
    const { classes } = this.props;
    switch (element.$type) {
      case "YearFlag":
        return (
          <li key={"history:yearFlag" + element.value}>
            <div className={classes.historyYearFlag}>
              <Typography variant="body2">{element.value}</Typography>
            </div>
          </li>
        );
      default:
        return "NO SUCH $TYPE FOR HISTORY";
    }
  };
  render() {
    const { pending, error, elements } = this.state;
    const { classes } = this.props;
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
          {elements.map(element => {
            const fn = this.props.listElement || this.defaultListElement;
            if (element.$type) return this.historyElement(element);
            return (
              <li
                className={classes.historyElement}
                key={"history-" + element.requestId}
              >
                <div className={classes.historyListItemIndicator}>
                  <div className={classes.historyListItemCircleHolder}>
                    <span className={classes.historyListItemCircle} />
                  </div>
                </div>
                <div className={classes.historyElementPaper}>{fn(element)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Tracker", defaultStyle))(
  Container(History)
);
