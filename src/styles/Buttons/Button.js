import Color from "color";
const style = theme => materialUiTheme => ({
  btn: {},
  default: {
    backgroundColor: theme.palette.grey,
    color: "#000",
    "&:hover": {
      backgroundColor: Color(theme.palette.grey)
        .darken(0.2)
        .hex(),
      color: "#000"
    }
  },
  primary: {
    backgroundColor: theme.palette.primary,
    color: "#fff",
    "&:hover": {
      backgroundColor: Color(theme.palette.primary)
        .darken(0.2)
        .hex(),
      color: "#fff"
    }
  },
  secondary: {
    backgroundColor: theme.palette.secondary,
    color: "#fff",
    "&:hover": {
      backgroundColor: Color(theme.palette.secondary)
        .darken(0.2)
        .hex(),
      color: "#fff"
    }
  },
  success: {
    backgroundColor: theme.palette.success,
    color: "#fff",
    "&:hover": {
      backgroundColor: Color(theme.palette.success)
        .darken(0.2)
        .hex(),
      color: "#fff"
    }
  },
  danger: {
    backgroundColor: theme.palette.danger,
    color: "#fff",
    "&:hover": {
      backgroundColor: Color(theme.palette.danger)
        .darken(0.2)
        .hex(),
      color: "#fff"
    }
  },
  warning: {
    backgroundColor: theme.palette.warning,
    color: "#fff",
    "&:hover": {
      backgroundColor: Color(theme.palette.warning)
        .darken(0.2)
        .hex(),
      color: "#fff"
    }
  },
  switchRoot: {
    width: "36px"
  },
  switchIcon: {
    boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.7)"
  },
  switchBase: {
    width: "22px",
    height: "36px"
  }
});

export default style;
