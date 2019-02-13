import React, { Component } from "react";
import { Drawer, IconButton, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Button from "./Button";
import Theme from "../Theme";
import defaultStyle from "../../styles/Buttons/DrawerButton";
import className from "classnames";

class DrawerButton extends Component {
  state = {
    open: false
  };
  toggleDrawer = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };
  render() {
    const {
      classes,
      position,
      children,
      variant,
      label,
      style,
      badge,
      override = {}
    } = this.props;
    return (
      <div className={classes.holder} style={style}>
        <Badge
          classes={{ badge: className([classes.badge, override.badge]) }}
          badgeContent={badge}
          invisible={!Boolean(badge) && badge !== 0}
          color="secondary"
        >
          <Button variant={variant} onClick={this.toggleDrawer}>
            {label}
          </Button>
        </Badge>
        <Drawer
          anchor={position}
          open={this.state.open}
          onClose={() => this.toggleDrawer(false)}
          classes={{
            paper: classes.drawer
          }}
        >
          <div>
            <IconButton
              onClick={() => {
                this.toggleDrawer();
              }}
              className={classes.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </div>
          <div className={classes.drawerContent}>{children}</div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Buttons/DrawerButton", defaultStyle))(
  DrawerButton
);
