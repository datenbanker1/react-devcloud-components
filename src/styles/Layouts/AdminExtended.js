const style = theme => materialUiTheme => {
  let element = {
    header: {
      backgroundColor: theme.palette.thirdly
    },
    bg: {
      backgroundColor: theme.palette.thirdly,
      height: "350px",
      zIndex: -1,
      width: "100%",
      position: "absolute"
    },
    tobBar: {
      display: "flex",
      height: "60px",
      width: "100%",
      zIndex: "2",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    },
    logo: {
      padding: "0px 8px"
    },
    navigation: {
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
      padding: "0px 32px 0px",
      "@media (max-width: 512px)": {
        padding: "16px 8px"
      }
    },
    menu: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
      maxHeight: "calc(100vh - 101px)",
      "@media (max-width: 512px)": {
        overflowY: "scroll"
      }
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
      textDecoration: "none"
    },
    rippleMenu: {
      color: theme.palette.primary
    },
    subNavigation: {
      padding: "8px",
      width: "234px"
    },
    appBar: {
      padding: "32px",
      "@media (max-width: 512px)": {
        padding: "69px 8px 8px 8px"
      }
    },
    title: {
      color: "#fff",
      fontWeight: "100"
    },
    homeHolder: {
      display: "inline-block",
      padding: "8px 8px 8px 0px"
    },
    home: {
      color: "rgba(255, 255, 255, 0.4)"
    },
    breadCrumbIcon: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "12px",
      display: "inline-block"
    },
    breadCrumb: {
      display: "inline-block",
      padding: "4px"
    },
    breadCrumbTitle: {
      display: "inline-block",
      paddingLeft: "8px",
      color: "rgba(255, 255, 255, 0.4)"
    },
    breadCrumbTitleActive: {
      display: "inline-block",
      paddingLeft: "8px",
      color: "rgba(255, 255, 255, 1)"
    },
    actionHolder: {
      textAlign: "right",
      "@media (max-width: 512px)": {
        textAlign: "left"
      }
    },
    subMenu: {
      listStyle: "none",
      paddingLeft: "16px"
    },
    subMenuClose: {
      color: "rgba(255, 255, 255, 0.4)",
      textAlign: "right"
    },
    subMenuLink: {
      "& :first-child": {
        padding: "0px"
      }
    },
    elementsHolder: {
      display: "block",
      backgroundColor: theme.palette.thirdly,
      zIndex: "1",
      maxWidth: "250px",
      minWidth: "200px",
      "@media (min-width: 512px)": {
        textAlign: "left",
        margin: "10px 0px 0px 0px",
        padding: "8px",
        borderTop: "0px",
        position: "absolute",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }
    },
    alignCenter: {
      textAlign: "center",
      paddingTop: "30px"
    },
    "@media (max-width: 512px)": {
      tobBar: {
        position: "fixed",
        zIndex: 3
      },
      logo: {
        display: "none",
        padding: "0px",
        maxWidth: "250px",
        width: "250px",
        height: "60px",
        position: "absolute",
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
        margin: "10px 0px",
        color: "rgba(255, 255, 255, 0.4)",
        "&:hover": {
          color: "rgba(255, 255, 255, 1)",
          backgroundColor: "inherit !important"
        }
      },
      respBtn: {
        display: "inline-block"
      },
      subNavigation: {
        display: "none"
      }
    }
  };

  return element;
};

export default style;
