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
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-light-svg-icons/faBars";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";
import { faSignOutAlt } from "@fortawesome/pro-light-svg-icons/faSignOutAlt";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Layouts/Admin";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: window.innerWidth > 559,
      windowSize: window.innerWidth < 560 ? "xs" : "lg"
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize() {
    const width = window.innerWidth;
    const { windowSize, menu } = this.state;
    if (width < 560 && windowSize !== "xs")
      this.setState({ ...this.state, windowSize: "xs", menu: false });
    else if (width > 559 && windowSize !== "lg")
      this.setState({ ...this.state, windowSize: "lg" });
  }

  toggleMenu(set) {
    let menu = set;
    if (typeof menu !== "undefined") menu = !this.state.menu;
    this.setState({ ...this.state, menu });
  }
  renderNavigationElements(link, index, keyPrefix = "") {
    const { classes, routing } = this.props;
    const active =
      routing && link.path ? link.path === routing.match.path : false;
    const wrapLink = component => {
      if (link.path)
        return (
          <a
            key={keyPrefix + "navigation-link-" + index}
            href={link.path}
            className={classes.linkMenu}
          >
            {component}
          </a>
        );
      return (
        <span key={keyPrefix + "navigation-element-" + index}>{component}</span>
      );
    };

    return (
      <div key={"navigation-element-" + index}>
        {wrapLink(
          <ListItem
            classes={{
              root: classNames([
                classes.rippleMenu,
                keyPrefix && classes.linkListElementHolder
              ])
            }}
            button
          >
            {link.icon && (
              <ListItemIcon
                classes={{
                  root: classNames([
                    classes.fontMenu,
                    classes.iconMenu,
                    active && classes.activeLink
                  ])
                }}
              >
                <FontAwesomeIcon icon={link.icon} />
              </ListItemIcon>
            )}
            <ListItemText
              classes={{
                root: classNames([
                  keyPrefix && !link.icon && classes.linkListElementNoIcon,
                  keyPrefix && classes.linkListElementText
                ]),
                primary: classNames([
                  classes.fontMenu,
                  active && classes.activeLink,
                  keyPrefix && classes.linkListElementText
                ])
              }}
              inset
              primary={
                <span>
                  {link.name}
                  {link.pending && (
                    <CircularProgress
                      size={12}
                      classes={{ root: classes.pendingIcon }}
                    />
                  )}
                </span>
              }
            />
          </ListItem>
        )}
        {link.elements && (
          <ul className={classes.linkList}>
            {link.elements.map((item, i) => (
              <li
                key={"list-element" + index + "-" + i}
                className={classes.linkListElement}
              >
                {this.renderNavigationElements(item, i, "list-element" + index)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  renderLinks() {
    const { links, classes } = this.props;
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
          return this.renderNavigationElements(link, index);
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
                className={classes.openMenuButton}
              >
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            )}
            {this.state.menu && window.innerWidth < 560 && (
              <IconButton className={classes.openMenuButton}>
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {page}
            </Typography>
            <IconButton
              onClick={() => {
                this.props.signOut();
              }}
              className={classes.signOutButton}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </IconButton>
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
