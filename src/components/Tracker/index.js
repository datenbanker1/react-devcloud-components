import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf, faComments } from "@fortawesome/pro-light-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import History from "./History";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Theme from "../Theme";
import defaultStyle from "../../styles/Tracker";

class Tracker extends Component {
  state = {
    mode: 0,
    history: {
      events: ""
    },
    comments: {}
  };
  componentDidMount() {}
  changeMode = (event, mode) => {
    this.setState({ mode });
  };
  render() {
    const { mode } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <BottomNavigation
          classes={{ root: classes.menu }}
          value={mode}
          onChange={this.changeMode}
          showLabels
        >
          <BottomNavigationAction
            label="History"
            icon={
              <span className={classes.icon}>
                <FontAwesomeIcon icon={faHourglassHalf} />
              </span>
            }
          />
          <BottomNavigationAction
            label="Kommentare"
            icon={
              <span className={classes.icon}>
                <FontAwesomeIcon icon={faComments} />
              </span>
            }
          />
        </BottomNavigation>
        <div>
          {!mode && (
            <History
              id={this.props.id}
              type={this.props.type}
              {...{ ...(this.props.history || {}) }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Tracker", defaultStyle))(Tracker);
