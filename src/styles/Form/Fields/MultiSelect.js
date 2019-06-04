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
    disabledCursor: {
      cursor: "not-allowed !important"
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
    chip: {
      height: "15px",
      margin: "2px 1px",
      backgroundColor: theme.palette.primary,
      color: "#fff"
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
    placeholder: {
      color: "rgba(0, 0, 0, .54)"
    },
    fullFieldRoot: {
      padding: "0px",
      "&:hover": {
        borderRadius: materialUiTheme.shape.borderRadius,
        backgroundColor: fade(materialUiTheme.palette.grey.main, 0.5)
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
      borderRadius: materialUiTheme.shape.borderRadius,
      padding: "9px 10px 8px",
      backgroundColor: fade(materialUiTheme.palette.grey.main, 0.5)
    },
    fullFieldSelect: {
      "&:focus": { borderRadius: materialUiTheme.shape.borderRadius },
      "&:hover": {
        backgroundColor: fade(materialUiTheme.palette.grey.main, 0.5)
      }
    },
    stateHolder: {
      textAlign: "right"
    },
    state: {
      position: "absolute",
      margin: "-26px 0px 0px -40px"
    },
    inputBase: {
      paddingRight: "50px"
    }
  };
  return element;
};

export default style;
