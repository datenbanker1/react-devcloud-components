import React, { Component } from "react";
import classNames from "classnames";

import {
  AppBar,
  Toolbar,
  Typography,
  SwipeableDrawer,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  withStyles
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-light-svg-icons/faBars";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";
import Theme from "../../Theme";
import defaultStyle from "../../../styles/Layouts/Admin";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: window.innerWidth > 559
    };
  }
  toggleMenu(set) {
    let menu = set;
    if (typeof menu !== "undefined") menu = !this.state.menu;
    this.setState({ ...this.state, menu });
  }
  renderLinks() {
    const { links, classes, routing } = this.props;
    return (
      <List
        component="nav"
        subheader={
          <ListSubheader classes={{ root: classes.fontMenu }} component="div">
            Navigation
          </ListSubheader>
        }
      >
        {links.map((link, index) => {
          const active =
            routing && link.path ? link.path === routing.match.path : false;
          return (
            <a
              key={"navigation-link-" + index}
              href={link.path}
              className={classes.linkMenu}
            >
              <ListItem classes={{ root: classes.rippleMenu }} button>
                {link.icon && (
                  <ListItemIcon
                    classes={{
                      root: classNames([
                        classes.fontMenu,
                        active ? classes.activeLink : false
                      ])
                    }}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </ListItemIcon>
                )}
                <ListItemText
                  classes={{
                    primary: classNames([
                      classes.fontMenu,
                      active ? classes.activeLink : false
                    ])
                  }}
                  inset
                  primary={link.name}
                />
              </ListItem>
            </a>
          );
        })}
      </List>
    );
  }
  render() {
    const { page, content, classes } = this.props;
    const resp = !(window.innerWidth > 559);
    return (
      <div className="admin-layout">
        <AppBar
          classes={{
            root: classNames([
              this.state.menu && !resp ? classes.appBarOpen : false
            ])
          }}
        >
          <Toolbar>
            {!this.state.menu && (
              <IconButton
                onClick={() => {
                  this.toggleMenu(true);
                }}
                className={classes.closeButton}
              >
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit">
              {page}
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          variant="persistent"
          anchor={"left"}
          classes={{ paper: classes.menu }}
          onClose={() => {
            this.toggleMenu(false);
          }}
          onOpen={() => {
            this.toggleMenu(true);
          }}
          open={this.state.menu}
        >
          <div className={classes.closeButtonHolder}>
            <IconButton
              onClick={() => {
                this.toggleMenu(false);
              }}
              className={classes.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </div>
          <Divider classes={{ root: classes.dividerMenu }} />
          {this.renderLinks()}
        </SwipeableDrawer>
        <main
          className={
            this.state.menu && !resp ? classes.contentOpen : classes.content
          }
        >
          {content}
        </main>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(Admin);
