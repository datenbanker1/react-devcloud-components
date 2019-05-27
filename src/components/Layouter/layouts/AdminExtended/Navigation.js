import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  defaultNavigation() {
    this.defaultNavigationElement = (link, index, keyPrefix = "") => {
      const { classes, routing } = this.props;
      const paths = [link.path, ...(link.aliasPath || [])];
      const active = routing ? paths.indexOf(routing.match.path) > -1 : false;
      const { backgroundColor } = this.props.layoutProps;
      let background = {};
      if (backgroundColor) {
        background.backgroundColor = `${backgroundColor}`;
      }

      const listElement = (
        <span
          onClick={e => {
            if (!link.showElements && link.onClick)
              this.props.dispatch(link.onClick);
          }}
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
            primary={<span className={classes.menuTextTypo}>{link.name}</span>}
          />
        </span>
      );
      return (
        <li
          key={"navigation-element-" + index}
          className={classNames([
            classes.rippleMenu,
            keyPrefix && classes.linkListElementHolder
          ])}
        >
          <Link
            key={keyPrefix + "navigation-link-" + index}
            to={link.linkTo || ""}
            className={classNames([
              classes.fontMenu,
              active && classes.active,
              classes.linkMenu,
              !keyPrefix || classes.subMenuLink
            ])}
          >
            {listElement}
          </Link>
          {!!link.showElements && !!link.elements && (
            <div style={background} className={classes.elementsHolder}>
              <div className={classes.subMenuClose}>
                <FontAwesomeIcon
                  onClick={e => {
                    if (link.showElements && link.onClose)
                      this.props.dispatch(link.onClose);
                  }}
                  style={{ cursor: "pointer" }}
                  icon={faTimes}
                />
              </div>
              {link.pending && (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress size={22} style={{ color: "#fff" }} />
                </div>
              )}
              {!link.pending && (
                <ul className={classes.subMenu}>
                  {link.elements.map((link, index) =>
                    this.defaultNavigationElement(
                      link,
                      index,
                      index + "subElement"
                    )
                  )}
                </ul>
              )}
            </div>
          )}
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
    const { links, classes, breadCrumbs } = this.props;
    const {
      logo,
      navigation,
      sideBar,
      backgroundImage,
      backgroundColor
    } = this.props.layoutProps;
    const showNavigation = this.state.navigation;
    const showSideBar = this.state.sideBar;
    let headerStyle = {};
    let background = {};
    if (backgroundImage)
      headerStyle.backgroundImage = `url(${backgroundImage})`;
    if (backgroundColor) {
      headerStyle.backgroundColor = `${backgroundColor}`;
      background.backgroundColor = `${backgroundColor}`;
    }
    const breadCrumbLast = breadCrumbs.length - 1;

    return (
      <header className={classes.header} style={headerStyle}>
        <div className={classes.tobBar} style={background}>
          <div
            style={background}
            className={classNames([
              classes.logo,
              showNavigation && classes.logoShow
            ])}
          >
            {Boolean(logo) && logo}
          </div>
          <div
            style={background}
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
        <div className={classes.appBar}>
          <Grid container spacing={8}>
            <Grid item sm={6} xs={12}>
              <Typography variant="h5" className={classes.title}>
                {this.props.page}
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
      </header>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  Container(AdminExtendedNavigation)
);
