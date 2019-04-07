const style = theme => materialUiTheme => ({
  delete: {
    border: "1px solid " + theme.palette.danger,
    backgroundColor: theme.palette.danger,
    color: "#fff"
  },
  chips: {
    margin: "5px 10px 3px 0px",
    color: "#fff"
  },
  chipsOutlined: {
    margin: "5px 10px 3px 0px"
  },
  addMenu: {
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)"
  },
  pending: {
    margin: "9px 0px"
  }
});

export default style;
