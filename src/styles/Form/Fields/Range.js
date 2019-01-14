const style = theme => materialUiTheme => {
  let element = {
    formControl: { width: "100%" },
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
    track: {
      backgroundColor: theme.palette.primary,
      height: "2px"
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
      margin: "35px 0px 13px 0px",
      zIndex: "0"
    },
    rangeInput: {
      margin: "35px 0px 13px 0px",
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
