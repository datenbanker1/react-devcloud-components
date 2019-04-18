const style = theme => materialUiTheme => ({
  holder: {
    margin: "-8px -8px 0px",
    padding: "8px",
    height: "41px"
  },
  fixer: {
    position: "fixed",
    backgroundColor: "#fff",
    margin: "-8px -8px 0px",
    zIndex: 100,
    whiteSpace: "nowrap",
    borderBottom: "1px solid " + theme.palette.background
  },
  childrenHolder: {
    padding: "8px"
  }
});

export default style;
