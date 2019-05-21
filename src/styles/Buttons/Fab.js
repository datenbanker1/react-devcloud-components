import Color from "color";
const style = theme => materialUiTheme => ({
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
  fabLabel: {
    fontSize: "1.5em"
  },
  fabSmall: {
    width: "25px",
    height: "25px",
    minHeight: "25px"
  },
  fabMedium: {
    width: "36px",
    height: "36px"
  },
  angular: {
    borderRadius: "4px"
  }
});

export default style;
