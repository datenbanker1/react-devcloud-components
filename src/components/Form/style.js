const styles = theme => ({
  formControl: {
    width: "100%"
  },
  input: {
    width: "100%",
    "&:hover:before": {
      borderBottom: "1px solid " + theme.palette.default.main + " !important"
    },
    "&:before": {
      borderBottom: "1px solid " + theme.palette.default.main + " !important"
    },
    "&:after": {
      borderBottom: "1px solid " + theme.palette.secondary.main + " !important"
    }
  },
  inputSuccess: {
    width: "100%",
    "&:hover:before": {
      borderBottom: "1px solid " + theme.palette.success.main + " !important"
    },
    "&:before": {
      borderBottom: "1px solid " + theme.palette.success.main + " !important"
    },
    "&:after": {
      borderBottom: "1px solid " + theme.palette.success.main + " !important"
    }
  },
  inputError: {
    width: "100%",
    "&:hover:before": {
      borderBottom: "1px solid " + theme.palette.danger.main + " !important"
    },
    "&:before": {
      borderBottom: "1px solid " + theme.palette.danger.main + " !important"
    },
    "&:after": {
      borderBottom: "1px solid " + theme.palette.danger.main + " !important"
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
  labelReadOnly: {
    color: theme.palette.default.dark + " !important",
    fontWeight: "100 !important",
    background: "none",
    "&:focus": {
      background: "none"
    }
  },
  chip: {
    height: "19px",
    margin: "2px 1px"
  },
  labelSuccess: {
    color: theme.palette.success.main + " !important"
  },
  labelError: {
    color: theme.palette.danger.main + " !important"
  },
  label: {
    color: theme.palette.default.dark + " !important",
    "&:focus": {
      color: theme.palette.secondary.dark + " !important"
    }
  },
  labelNotFloating: {
    fontSize: "0.75rem"
  },
  rangeInputReadOnly: {
    margin: "12px 0px"
  },
  rangeInput: {
    margin: "7px 0px"
  },
  multiSelect: {
    whiteSpace: "normal"
  },
  multiSelectInput: {
    padding: "3px 7px 4px 7px"
  },
  danger: {
    color: theme.palette.danger.main
  },
  success: {
    color: theme.palette.success.main
  },
  default: {
    color: theme.palette.default.main
  },
  defaultLabel: {
    color: "inherit"
  }
});

export default styles;
