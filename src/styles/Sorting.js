const style = theme => materialUiTheme => ({
  holder: {
    margin: "0px",
    paddingTop: "12px"
  },
  list: {
    listStyle: "none",
    padding: "0px",
    margin: "0px",
    whiteSpace: "nowrap",
    overflowX: "scroll"
  },
  listItem: {
    display: "inline-block",
    padding: "4px 8px"
  },
  text: {
    cursor: "pointer",
    color: theme.palette.fontSubtle
  },
  textActive: {
    cursor: "pointer"
  },
  icon: {
    marginRight: "5px"
  }
});

export default style;
