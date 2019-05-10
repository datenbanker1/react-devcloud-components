const style = theme => materialUiTheme => {
  let element = {
    header: {
      height: "400px",
      backgroundColor: theme.palette.thirdly,
      borderRadius: "0px 0px calc(80% - 50px) 0px"
    },
    tobBar: {
      display: "flex",
      height: "60px",
      width: "100%",
      zIndex: "2"
    },
    logo: {
      flexBasis: "242px",
      padding: "0px 8px"
    },
    navigation: {
      maxWidth: "calc(100% - 366px)",
      overflow: "hidden",
      flexGrow: "1"
    },
    actions: {
      flexBasis: "92px",
      padding: "0px 8px",
      textAlign: "right"
    },
    respBtn: {
      display: "none"
    },
    btn: {
      width: "50px",
      marginTop: "6px",
      color: "rgba(255, 255, 255, 0.4)",
      "&:hover": {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    signOutBtn: {
      marginTop: "6px",
      color: "rgba(255, 255, 255, 0.4)",
      "&:hover": {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    signOutLogo: {
      marginLeft: "4px"
    },
    main: {
      position: "absolute",
      top: "0px",
      margin: "60px 100px 0px 250px",
      zIndex: 1
    },
    content: {
      padding: "8px"
    },
    menu: {
      display: "flex",
      flexDirection: "row",
      padding: 0
    },
    menuText: {
      color: "inherit",
      paddingLeft: "5px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 100
    },
    iconMenu: {
      color: "inherit",
      width: "25px",
      margin: "0px"
    },
    fontMenu: {
      padding: "11px 0px",
      margin: "10px 16px 0px 0px",
      color: "rgba(255, 255, 255, 0.4) !important",
      "&:hover": {
        color: "rgba(255, 255, 255, 1) !important",
        backgroundColor: "inherit !important"
      }
    },
    active: {
      color: "rgba(255, 255, 255, 1) !important"
    },
    linkMenu: {
      display: "flex",
      color: "inherit !important",
      textDecoration: "none"
    },
    sideBar: {
      padding: "8px",
      width: "234px",
      height: "316px"
    },
    rippleMenu: {
      color: theme.palette.primary
    },
    subNavigation: {
      padding: "8px",
      width: "234px"
    },
    "@media (max-width: 512px)": {
      tobBar: {
        position: "fixed",
        backgroundColor: theme.palette.thirdly,
        zIndex: 2
      },
      logo: {
        flexBasis: "auto",
        padding: "0px 8px",
        flexGrow: 1
      },
      actions: {
        flexBasis: "150px"
      },
      navigation: {
        display: "none",
        maxWidth: "250px",
        width: "250px",
        position: "absolute",
        backgroundColor: theme.palette.thirdly,
        top: "60px",
        flexGrow: "0"
      },
      sideBar: {
        display: "none",
        maxWidth: "250px",
        width: "250px",
        position: "fixed",
        backgroundColor: theme.palette.thirdly,
        top: "60px",
        flexGrow: "0",
        zIndex: 2
      },
      sideBarShow: {
        display: "block"
      },
      navigationShow: {
        display: "block"
      },
      menu: {
        display: "block"
      },
      fontMenu: {
        padding: "11px 16px",
        margin: "10px 0px"
      },
      respBtn: {
        display: "inline-block"
      },
      main: {
        position: "absolute",
        top: "0px",
        margin: "60px 0px 0px 0px"
      },
      subNavigation: {
        display: "none"
      }
    }
  };

  return element;
};

export default style;
