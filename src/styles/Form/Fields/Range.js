const style = theme => materialUiTheme => {
  let element = {
    formControl: { width: "100%", height: "48px" },
    label: {
      transformOrigin: "top left",
      transform: "translate(0, 1.5px) scale(0.75)"
    },
    labelError: {
      color: theme.palette.danger + " !important"
    },
    labelReadOnly: {
      color: theme.palette.default.dark + " !important",
      fontWeight: "100 !important",
      background: "none",
      "&:focus": {
        background: "none"
      }
    },
    rail: {
      position: "absolute",
      width: "100%",
      height: 2,
      marginTop: 16,
      borderRadius: 5,
      backgroundColor: theme.palette.primary,
      opacity: 0.2
    },
    handle: {
      position: "absolute",
      marginLeft: -8,
      marginTop: 10,
      zIndex: 1,
      width: 16,
      height: 16,
      border: 0,
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "50%",
      backgroundColor: theme.palette.primary,
      color: "#fff"
    },
    track: {
      position: "absolute",
      height: 2,
      zIndex: 1,
      marginTop: 16,
      backgroundColor: theme.palette.primary,
      borderRadius: 5,
      cursor: "pointer"
    },
    linearProgessRail: {
      position: "absolute",
      width: "100%",
      height: 4,
      marginTop: 16,
      backgroundColor: theme.palette.primary,
      opacity: 0.2
    },
    linearProgressTrack: {
      position: "absolute",
      height: 4,
      zIndex: 1,
      marginTop: 16,
      backgroundColor: theme.palette.primary,
      cursor: "pointer"
    },
    disabled: {
      backgroundColor: theme.palette.default
    },
    button: {
      width: "20px",
      height: "20px"
    },
    buttonStart: {
      marginLeft: "10px"
    },
    buttonEnd: {
      marginLeft: "-10px"
    },
    rangeInputReadOnly: {
      margin: "16px 0px 13px 0px",
      zIndex: "0"
    },
    rangeInput: {
      margin: "16px 0px 13px 0px",
      zIndex: "0"
    },
    danger: {
      color: theme.palette.danger
    },
    success: {
      color: theme.palette.success
    },
    default: {
      color: theme.palette.default
    },
    defaultLabel: {
      color: "inherit"
    }
  };
  return element;
};

export default style;
