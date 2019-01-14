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
    menu: {
      width: "250px",
      backgroundColor: theme.palette.thirdly
    },
    fontMenu: {
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 100
    },
    linkMenu: {
      textDecoration: "none"
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
        padding: "56px 8px 8px 258px"
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
