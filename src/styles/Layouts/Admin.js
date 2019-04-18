const style = theme => materialUiTheme => {
  let element = {
    closeButton: {
      margin: materialUiTheme.spacing.unit,
      width: "48px",
      height: "48px",
      color: "rgba(255, 255, 255, 0.7)"
    },
    closeButtonHolder: {
      textAlign: "right"
    },
    openMenuButton: {
      margin: materialUiTheme.spacing.unit,
      width: "48px",
      height: "48px",
      color: "rgba(255, 255, 255, 1)"
    },
    signOutButton: {
      margin: materialUiTheme.spacing.unit,
      width: "48px",
      height: "48px",
      color: "rgba(255, 255, 255, 1)",
      paddingLeft: "16px"
    },
    menu: {
      width: "250px",
      backgroundColor: theme.palette.thirdly
    },
    iconMenu: {
      width: "25px",
      margin: "0px"
    },
    fontMenu: {
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 100
    },
    linkMenu: {
      textDecoration: "none"
    },
    linkList: {
      paddingLeft: "59px",
      margin: "0px",
      listStyle: "none"
    },
    linkListElementNoIcon: { paddingLeft: "0px !important" },
    linkListElementText: {
      fontSize: "0.9rem",
      paddingLeft: "0px",
      lineHeight: "1rem"
    },
    linkListElementHolder: {
      padding: "8px 16px",
      borderLeft: "1px solid rgba(255, 255, 255, 0.4)"
    },
    pendingIcon: {
      color: "rgba(255, 255, 255, 0.7)",
      float: "right"
    },
    activeLink: {
      color: "rgba(255, 255, 255, 1)"
    },
    dividerMenu: {
      backgroundColor: "rgba(255, 255, 255, 0.12)"
    },
    rippleMenu: {
      color: theme.palette.primary
    },
    appBarOpen: {},
    contentOpen: {
      padding: "64px 8px 8px 258px",
      [materialUiTheme.breakpoints.up("xs") +
      " and (orientation: landscape)"]: {
        padding: "72px 8px 8px 258px"
      },
      [materialUiTheme.breakpoints.up("sm")]: {
        padding: "72px 8px 8px 258px"
      }
    },
    content: {
      [materialUiTheme.breakpoints.down("sm")]: {
        padding: "72px 8px 8px 8px"
      },
      [materialUiTheme.breakpoints.up("sm")]: {
        padding: "72px 8px 8px 8px"
      }
    }
  };
  element.appBarOpen.marginLeft = element.menu.width;
  element.appBarOpen.width = "calc(100% - " + element.menu.width + ")";
  return element;
};

export default style;
