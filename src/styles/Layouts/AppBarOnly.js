const style = theme => materialUiTheme => {
  let element = {
    signOutButton: {
      margin: materialUiTheme.spacing.unit,
      width: "48px",
      height: "48px",
      color: "rgba(255, 255, 255, 1)",
      paddingLeft: "16px"
    },
    content: {
      [materialUiTheme.breakpoints.down("sm")]: {
        padding: "72px 8px 8px 8px"
      },
      [materialUiTheme.breakpoints.up("sm")]: {
        padding: "72px 8px 8px 8px"
      }
    }
  };
  return element;
};

export default style;
