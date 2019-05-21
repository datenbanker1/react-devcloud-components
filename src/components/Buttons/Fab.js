import React, { Component } from "react";
import classNames from "classnames";
import { Fab as FabButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/Fab";

class Fab extends Component {
  render() {
    const {
      classes,
      icon,
      variant,
      style,
      onClick,
      override = {},
      angular,
      small,
      medium
    } = this.props;
    const className = variant || "default";
    return (
      <FabButton
        className={classes[className]}
        size="small"
        classes={{
          root: classNames([
            small && classes.fabSmall,
            medium && classes.fabMedium,
            override.button,
            angular && classes.angular
          ]),
          label: classNames([classes.fabLabel, override.icon])
        }}
        {...{ style, onClick }}
      >
        <FontAwesomeIcon icon={icon} />
      </FabButton>
    );
  }
}

export default withStyles(Theme.getStyle("Buttons/Fab", defaultStyle))(Fab);
