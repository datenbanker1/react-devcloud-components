const style = theme => materialUiTheme => {
  let element = {
    header: {
      backgroundColor: theme.palette.thirdly
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
    main: {},
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
        zIndex: 3
      },
      logo: {
        display: "none",
        padding: "0px",
        maxWidth: "250px",
        width: "250px",
        height: "60px",
        position: "absolute",
        backgroundColor: theme.palette.thirdly,
        top: "60px"
      },
      logoShow: {
        display: "block"
      },
      customBar: {
        flexBasis: "auto",
        padding: "0px 8px",
        flexGrow: 1
      },
      actions: {
        flexBasis: "100px"
      },
      navigation: {
        display: "none",
        maxWidth: "250px",
        width: "250px",
        position: "absolute",
        backgroundColor: theme.palette.thirdly,
        top: "120px",
        flexGrow: "0"
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
        top: "60px",
        left: "0px",
        right: "0px"
      },
      subNavigation: {
        display: "none"
      }
    }
  };

  return element;
};

export default style;
