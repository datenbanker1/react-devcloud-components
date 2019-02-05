import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/pro-light-svg-icons";
import Theme from "./Theme";
import defaultStyle from "../styles/Sorting";

class Block extends Component {
  state = {
    active: null,
    oder: null
  };
  setActive = option => {
    let { active, order } = this.state;
    const { onChange } = this.props;
    if (option === active) {
      active = order === "desc" ? null : option;
      order = order === null ? "asc" : order === "asc" ? "desc" : null;
      this.setState({
        ...this.state,
        active,
        order
      });
      onChange({ active, order });
    } else {
      this.setState({
        ...this.state,
        active: option,
        order: "asc"
      });
      onChange({ active: option, order: "asc" });
    }
  };
  render() {
    const { classes, options } = this.props;
    const { active, order } = this.state;
    return (
      <div className={classes.holder}>
        <ul className={classes.list}>
          {options &&
            options.map((option, index) => {
              return (
                <li key={option + "-" + index} className={classes.listItem}>
                  {option === active && (
                    <Typography
                      variant="body2"
                      onClick={() => this.setActive(option)}
                      className={classes.textActive}
                    >
                      <FontAwesomeIcon
                        icon={order === "asc" ? faArrowUp : faArrowDown}
                        className={classes.icon}
                      />
                      {option}
                    </Typography>
                  )}
                  {option !== active && (
                    <Typography
                      variant="caption"
                      onClick={() => this.setActive(option)}
                      className={classes.text}
                    >
                      {option}
                    </Typography>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Sorting", defaultStyle))(Block);
