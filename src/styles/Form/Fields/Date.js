import { fade } from "@material-ui/core/styles/colorManipulator";

const style = theme => materialUiTheme => {
  let element = {
    label: {
      transformOrigin: "top left",
      transform: "translate(0, 1.5px) scale(0.75)"
    },
    labelSuccess: {
      color: theme.palette.success + " !important"
    },
    labelReadOnly: {
      color: theme.palette.default.dark + " !important",
      fontWeight: "100 !important",
      background: "none",
      "&:focus": {
        background: "none"
      }
    },
    labelError: {
      color: theme.palette.danger + " !important"
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
      margin: "0"
    },
    fullFieldInput: {
      color: "inherit",
      width: "100%",
      borderRadius: materialUiTheme.shape.borderRadius,
      padding: "9px 10px 8px",
      backgroundColor: fade(materialUiTheme.palette.grey.main, 0.5),
      "&:hover": {
        backgroundColor: fade(materialUiTheme.palette.grey.main, 0.5)
      }
    }
  };
  return element;
};

export default style;
