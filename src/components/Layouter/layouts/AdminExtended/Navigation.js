import React, { Component } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/pro-light-svg-icons/faSignOutAlt";
import {
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";

import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";
import { faBars } from "@fortawesome/pro-light-svg-icons/faBars";
import { faUser } from "@fortawesome/pro-light-svg-icons/faUser";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";

class AdminExtendedNavigation extends Component {
  state = {
    navigation: false,
    sideBar: false
  };
  defaultNavigation() {
    this.defaultNavigationElement = (link, index, keyPrefix = "") => {
      const { classes, routing } = this.props;
      const paths = [link.path, ...(link.aliasPath || [])];
      const active = routing ? paths.indexOf(routing.match.path) > -1 : false;

      return (
        <li
          key={"navigation-element-" + index}
          className={classNames([
            classes.fontMenu,
            active && classes.active,
            classes.rippleMenu,
            keyPrefix && classes.linkListElementHolder
          ])}
        >
          <a
            key={keyPrefix + "navigation-link-" + index}
            href={link.path}
            className={classes.linkMenu}
          >
            {link.icon && (
              <ListItemIcon
                classes={{
                  root: classNames([
                    classes.iconMenu,
                    active && classes.activeLink
                  ])
                }}
              >
                <FontAwesomeIcon icon={link.icon} />
              </ListItemIcon>
            )}
            <ListItemText
              disableTypography
              classes={{
                root: classNames([
                  classes.menuText,
                  keyPrefix && !link.icon && classes.linkListElementNoIcon,
                  keyPrefix && classes.linkListElementText
                ]),
                primary: classNames([
                  active && classes.activeLink,
                  keyPrefix && classes.linkListElementText
                ])
              }}
              inset
              primary={
                <span className={classes.menuTextTypo}>{link.name}</span>
              }
            />
          </a>
        </li>
      );
    };
    const { links, classes } = this.props;
    return (
      <List className={classes.menu}>
        {links.map((link, index) => this.defaultNavigationElement(link, index))}
      </List>
    );
  }
  render() {
    const { links, classes } = this.props;
    const { logo, navigation, sideBar } = this.props.layoutProps;
    const showNavigation = this.state.navigation;
    const showSideBar = this.state.sideBar;

    return (
      <header className={classes.header}>
        <div className={classes.tobBar}>
          <div
            className={classNames([
              classes.logo,
              showNavigation && classes.logoShow
            ])}
          >
            {Boolean(logo) && logo}
          </div>
          <div
            className={classNames([
              classes.navigation,
              showNavigation && classes.navigationShow
            ])}
          >
            {navigation ? navigation(links) : this.defaultNavigation()}
          </div>
          <div
            className={classNames([
              classes.customBar,
              showSideBar && classes.sideBarShow
            ])}
          >
            {sideBar}
          </div>
          <div className={classes.actions}>
            <IconButton
              onClick={() => {
                this.setState({
                  ...this.state,
                  sideBar: false,
                  navigation: !Boolean(this.state.navigation)
                });
              }}
              className={classNames([classes.btn, classes.respBtn])}
            >
              <FontAwesomeIcon icon={showNavigation ? faTimes : faBars} />
            </IconButton>
            <IconButton
              onClick={() => {
                this.props.signOut();
              }}
              className={classNames([classes.btn, classes.signOutBtn])}
            >
              <FontAwesomeIcon
                className={classes.signOutLogo}
                icon={faSignOutAlt}
              />
            </IconButton>
          </div>
        </div>
      </header>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtendedNavigation
);
