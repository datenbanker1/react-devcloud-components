import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DevCloud } from "@datenbanker/devcloud-client-lib";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/pro-light-svg-icons/faSignOutAlt";

import {
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  withStyles,
  Typography,
  Grid,
  CircularProgress
} from "@material-ui/core";
import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";
import { faBars } from "@fortawesome/pro-light-svg-icons/faBars";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";
import { faHome } from "@fortawesome/pro-light-svg-icons/faHome";
import { faChevronRight } from "@fortawesome/pro-light-svg-icons/faChevronRight";
import CenterElements from "../../../CenterElements";
import Container from "../../../../container/Dispatcher";

class AdminExtendedNavigation extends Component {
  state = {
    navigation: false,
    sideBar: false
  };
  text = (link, active, keyPrefix = "") => {
    const { classes } = this.props;
    return (
      <span className={classes.linkMenu}>
        {link.icon && (
          <ListItemIcon
            classes={{
              root: classNames([classes.iconMenu, active && classes.activeLink])
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
          primary={<span className={classes.menuTextTypo}>{link.label}</span>}
        />
      </span>
    );
  };
  button = (link, active, index, keyPrefix) => {
    const { classes } = this.props;
    return (
      <div
        className={classNames([
          classes.fontMenu,
          (active || link.subMenu.show) && classes.active,
          classes.linkMenu,
          !keyPrefix || classes.subMenuLink
        ])}
        style={{ cursor: "pointer" }}
        onClick={e => {
          if (!link.subMenu.show && link.subMenu.onOpen)
            this.props.dispatch(link.subMenu.onOpen);
          if (link.subMenu.show && link.subMenu.onClose)
            this.props.dispatch(link.subMenu.onClose);
        }}
      >
        {this.text(link, active, keyPrefix)}
      </div>
    );
  };
  link = (link, active, index, keyPrefix) => {
    const { classes } = this.props;
    return (
      <Link
        key={keyPrefix + "navigation-link-" + index}
        to={link.path || ""}
        className={classNames([
          classes.fontMenu,
          active && classes.active,
          classes.linkMenu,
          !keyPrefix || classes.subMenuLink
        ])}
      >
        {this.text(link, active, keyPrefix)}
      </Link>
    );
  };
  subMenu = (link, index, keyPrefix = "") => {
    const { classes } = this.props;

    return (
      <div className={classes.elementsHolder}>
        <div className={classes.subMenuClose}>
          <FontAwesomeIcon
            onClick={e => {
              if (link.subMenu.show && link.subMenu.onClose)
                this.props.dispatch(link.subMenu.onClose);
            }}
            style={{ cursor: "pointer" }}
            icon={faTimes}
          />
        </div>
        {link.subMenu.pending && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress size={22} style={{ color: "#fff" }} />
          </div>
        )}
        {!link.subMenu.pending && (
          <ul className={classes.subMenu}>
            {link.subMenu.links.map((link, index) =>
              this.listElement(link, index, index + "subElement")
            )}
          </ul>
        )}
      </div>
    );
  };
  listElement = (link, index, keyPrefix = "") => {
    const { classes } = this.props;
    const { match = {}, location = {} } = this.props.routing;
    const paths = link.originalPaths || [link.path];
    const active =
      paths.indexOf(match.path) > -1 || paths.indexOf(location.pathname) > -1;

    return (
      <li
        key={"navigation-element-" + index}
        className={classNames([
          classes.rippleMenu,
          keyPrefix && classes.linkListElementHolder
        ])}
      >
        {link.path && this.link(link, active, index, keyPrefix)}
        {!!link.subMenu &&
          link.subMenu.onOpen &&
          this.button(link, active, index, keyPrefix)}
        {!!link.subMenu &&
          link.subMenu.show &&
          this.subMenu(link, active, index, keyPrefix)}
      </li>
    );
  };
  navigation() {
    const { links, classes } = this.props;
    const groups = DevCloud.getGroups();
    return (
      <List className={classes.menu}>
        {links
          .filter(
            link =>
              (!link.group ||
                (link.group && groups.indexOf(link.group) > -1)) &&
              link.show !== false
          )
          .map((link, index) => this.listElement(link, index))}
      </List>
    );
  }

  getActiveLink(links, match, location) {
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      if (link.subMenu) {
        const subLink = this.getActiveLink(link.subMenu.links, match, location);
        if (subLink) return subLink;
      }

      const paths = link.originalPaths || [link.path];
      if (paths.indexOf(match) > -1 || paths.indexOf(location) > -1)
        return link;
    }
    return false;
  }

  appBar() {
    const { classes } = this.props;
    const { match, location } = this.props.routing;
    const activeLink = this.getActiveLink(
      this.props.links,
      match.path,
      location.pathname
    );

    const breadCrumbs = activeLink.breadCrumbs || [];
    const breadCrumbLast = breadCrumbs.length - 1;
    return (
      <div className={classes.appBar}>
        <Grid container spacing={8}>
          <Grid item sm={6} xs={12}>
            <Typography variant="h5" className={classes.title}>
              {activeLink.title || activeLink.label}
            </Typography>
            <div className={classes.breadCrumbHolder}>
              <div className={classes.homeHolder}>
                <FontAwesomeIcon className={classes.home} icon={faHome} />
              </div>
              {breadCrumbs.map((breadCrumb, index) => {
                return (
                  <div
                    key={"breadCrumb-" + index}
                    className={classes.breadCrumb}
                  >
                    <div className={classes.breadCrumbIcon}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    <a href={breadCrumb.link}>
                      <Typography
                        className={
                          breadCrumbLast === index
                            ? classes.breadCrumbTitleActive
                            : classes.breadCrumbTitle
                        }
                      >
                        {breadCrumb.title}
                      </Typography>
                    </a>
                  </div>
                );
              })}
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <CenterElements>
              <div className={classes.actionHolder}>{this.props.actions}</div>
            </CenterElements>
          </Grid>
        </Grid>
      </div>
    );
  }
  render() {
    const { classes, breadCrumbs = [] } = this.props;
    const { logo, sideBar } = this.props;
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
            {this.navigation()}
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
        {this.appBar()}
      </header>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  Container(AdminExtendedNavigation)
);
