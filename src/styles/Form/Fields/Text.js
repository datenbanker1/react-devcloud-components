import { fade } from "@material-ui/core/styles/colorManipulator";

const style = theme => materialUiTheme => {
  let element = {
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
    formControl: {
      width: "100%"
    },
    input: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.default + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.default + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.secondary + " !important"
      }
    },
    inputSuccess: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      }
    },
    inputError: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      }
    },
    inputReadonly: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid #fff !important"
      },
      "&:before": {
        borderBottom: "1px solid #fff !important"
      },
      "&:after": {
        borderBottom: "0px solid"
      }
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
    },
    fullFieldRoot: {
      padding: "0px",
      "&:hover": {
        borderRadius: materialUiTheme.shape.borderRadius,
        backgroundColor: fade("#e0e0e0", 0.5)
      },
      "&:hover:before": {
        borderBottom: "0px solid #fff !important"
      },
      "&:before": {
        borderBottom: "0px solid #fff !important"
      },
      "&:after": {
        borderBottom: "0px solid"
      }
    },
    fullFieldLabel: {
      zIndex: 2,
      margin: "3px 10px 8px"
    },
    fullFieldLabelShrink: {
      margin: "0px"
    },
    fullFieldInput: {
      color: "inherit",
      width: "100%",
      borderRadius: materialUiTheme.shape.borderRadius,
      padding: "9px 10px 8px",
      backgroundColor: fade("#e0e0e0", 0.5),
      "&:hover": {
        backgroundColor: fade("#e0e0e0", 0.5)
      }
    },
    fullFieldReadOnly: {
      padding: "9px 0px 8px"
    },
    multiLineReadOnly: {
      padding: "0px"
    },
    helpBlock: {
      margin: "2px 0px 0px 0px"
    },
    stateHolder: {
      textAlign: "right"
    },
    state: {
      position: "absolute",
      margin: "-26px 0px 0px -25px"
    },
    inputBase: {
      paddingRight: "37px"
    }
  };
  return element;
};

export default style;
