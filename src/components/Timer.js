import React, { Component } from "react";
import Container from "../container/Timer";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Online, Offline } from "react-detect-offline";
import {
  faPlay,
  faPause,
  faStop,
  faCheck,
  faTimes
} from "@fortawesome/pro-light-svg-icons";
import Theme from "./Theme";
import defaultStyle from "../styles/Timer";
import Storage from "@datenbanker/storage";
const storage = new Storage();

const settings = {
  delay: 500
};

const addLeadingZero = number => {
  return 10 > number ? "0" + number : "" + number;
};
const convertTime = number => {
  const hours = Math.floor(number / 3600);
  let rest = number % 3600;
  const minutes = Math.floor(rest / 60);
  const seconds = rest - minutes * 60;

  return (
    addLeadingZero(hours) +
    ":" +
    addLeadingZero(minutes) +
    ":" +
    addLeadingZero(seconds)
  );
};

class TimeClock extends Component {
  state = {
    displayTime: "00:00:00",
    timer: false,
    confirmStop: false,
    start: Number(storage.get("timer:start")) || false,
    pause: storage.get("timer:pause") === "1",
    pauses: storage.get("timer:pauses")
      ? JSON.parse(storage.get("timer:pauses"))
      : [],
    error: false,
    errorDescr: ""
  };
  componentWillMount() {
    if (this.state.timer === false && this.state.start) {
      this.startTimer();
    }
  }
  componentWillUnmount() {
    if (this.state.timer !== false) {
      window.clearInterval(this.state.timer);
      this.setState({ ...this.state, timer: false });
    }
  }
  setTime = () => {
    let time = Date.now() - this.state.start;
    this.state.pauses.forEach((pause, index) => {
      let { end, start } = pause;
      end =
        index === this.state.pauses.length - 1 && typeof end === "undefined"
          ? Date.now()
          : end;
      time = time - (end - start);
    });

    time = Math.floor(time / 1000);
    this.setState({
      ...this.state,
      displayTime: convertTime(time)
    });
  };
  startTimer = () => {
    const start = this.state.start || Date.now();
    storage.set("timer:start", start);
    this.props.startTimer();
    this.setState({
      ...this.state,
      start,
      timer: window.setInterval(async () => {
        this.setTime();
      }, settings.delay)
    });
  };
  startPause = () => {
    const start = Date.now();
    let newState = { ...this.state, pause: true };
    storage.set("timer:pause", "1");
    newState.pauses.push({ start: start });
    storage.set("timer:pauses", JSON.stringify(newState.pauses));
    this.setState(newState);
  };
  stopPause = () => {
    const end = Date.now();
    let newState = { ...this.state, pause: false };
    storage.delete("timer:pause");
    newState.pauses[newState.pauses.length - 1].end = end;
    storage.set("timer:pauses", JSON.stringify(newState.pauses));
    this.setState(newState);
  };
  stopTimer() {
    if (this.state.timer !== false) {
      window.clearInterval(this.state.timer);
    }

    const { start, pauses } = this.state;
    const end = Date.now();

    this.props.stopTimer(
      start,
      end,
      pauses,
      this.onClear,
      this.onError,
      this.props.on
    );
  }
  onClear = () => {
    this.setState({
      ...this.state,
      confirmStop: false,
      timer: false,
      displayTime: "00:00:00",
      latestPause: "00:00:00",
      start: false,
      pause: false,
      pauses: []
    });
    storage.delete("timer:start");
    storage.delete("timer:pause");
    storage.delete("timer:pauses");
  };
  onError = error => {
    this.setState({
      ...this.state,
      error: true,
      errorDescr: JSON.stringify(error)
    });
  };
  toggleConfirmStop() {
    this.setState({ ...this.state, confirmStop: !this.state.confirmStop });
  }
  render() {
    const { classes } = this.props;
    const { pauses, pause, start } = this.state;
    if (this.state.error)
      return (
        <div className="TimeClock" style={{ height: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Typography className={classes.error} variant="h4">
              Fehler!
            </Typography>
            <Typography className={classes.error} variant="body1">
              Der Server hat mit folgenden Fehler geantwortet:
              <br />
              <br />
              {this.state.errorDescr || <i>Keine Meldung!</i>}
              <br />
              <br />
              Bitte schicken Sie diese Nachricht ihrem Admin!
            </Typography>
          </div>
        </div>
      );

    return (
      <div className="TimeClock" style={{ height: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Typography
            component="h2"
            className={
              start && !pause
                ? classes.success
                : start && pause
                ? classes.warning
                : ""
            }
            variant="h3"
          >
            {this.state.displayTime}
          </Typography>
          {start === false && (
            <div className={classes.buttonBar}>
              <Button
                variant="contained"
                onClick={e => {
                  e.preventDefault();
                  this.props.startTimer();
                  this.startTimer();
                }}
              >
                Starten
                <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlay} />
              </Button>
            </div>
          )}
          {start !== false &&
            this.state.confirmStop === false &&
            pause === false && (
              <div className={classes.buttonBar}>
                <Button
                  variant="contained"
                  onClick={e => {
                    e.preventDefault();
                    this.startPause();
                  }}
                >
                  Pause
                  <FontAwesomeIcon
                    style={{ marginLeft: "10px" }}
                    icon={faPause}
                  />
                </Button>
                <Button
                  variant="contained"
                  className={classes.stopButton}
                  style={{ marginLeft: "10px" }}
                  onClick={e => {
                    e.preventDefault();
                    this.toggleConfirmStop();
                  }}
                >
                  Stop
                  <FontAwesomeIcon
                    style={{ marginLeft: "10px" }}
                    icon={faStop}
                  />
                </Button>
              </div>
            )}
          {start !== false &&
            this.state.confirmStop === true &&
            pause === false && (
              <div className={classes.buttonBar}>
                <Online>
                  <Typography
                    component="p"
                    variant="body1"
                    className={classes.confirmationText}
                  >
                    Wollen Sie die Zeitmessung wirklich beenden?
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={e => {
                      e.preventDefault();
                      this.stopTimer();
                    }}
                  >
                    Ja
                    <FontAwesomeIcon
                      style={{ marginLeft: "10px" }}
                      icon={faCheck}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.stopButton}
                    style={{ marginLeft: "10px" }}
                    onClick={e => {
                      e.preventDefault();
                      this.toggleConfirmStop();
                    }}
                  >
                    Nein
                    <FontAwesomeIcon
                      style={{ marginLeft: "10px" }}
                      icon={faTimes}
                    />
                  </Button>
                </Online>
                <Offline>
                  <Typography
                    component="p"
                    variant="body1"
                    className={classes.confirmationText}
                  >
                    Sie haben derzeit kein Internet und können daher die
                    Zeitmessung nicht beenden.
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={e => {
                      e.preventDefault();
                      this.toggleConfirmStop();
                    }}
                  >
                    Zurück
                  </Button>
                </Offline>
              </div>
            )}
          {pause !== false && (
            <div className={classes.buttonBar}>
              <Button
                variant="contained"
                onClick={e => {
                  e.preventDefault();
                  this.stopPause();
                }}
              >
                Weiter
                <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlay} />
              </Button>
            </div>
          )}
          {start !== false && (
            <div className={classes.pauses}>
              <Typography component="h4" variant="subtitle1">
                Pausen
              </Typography>
              {!pauses.length && (
                <Typography component="p" variant="body1">
                  <i>Keine</i>
                </Typography>
              )}
              <ul className={classes.pauseList}>
                {[...pauses].reverse().map((pause, index) => {
                  let { end, start } = pause;
                  end =
                    index === 0 && typeof end === "undefined"
                      ? Date.now()
                      : end;
                  const time = Math.floor((end - start) / 1000);
                  const active = index === 0 && pause;
                  return (
                    <li key={"pauses-" + index}>
                      <Typography
                        component="p"
                        className={active ? "" : ""}
                        variant="h4"
                      >
                        {convertTime(time)}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Timer", defaultStyle))(
  Container(TimeClock)
);
