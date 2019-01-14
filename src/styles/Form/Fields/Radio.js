const style = theme => materialUiTheme => {
  let element = {
    formControl: {
      width: "100%"
    },
    error: {
      border: "1px solid " + theme.palette.danger
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
