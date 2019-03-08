const style = theme => materialUiTheme => ({
  buttonBar: {
    margin: "15px 0px 0px 0px"
  },
  confirmationText: {
    margin: "0px 0px 10px 0px"
  },
  stopButton: {
    color: "#fff",
    backgroundColor: theme.palette.danger
  },
  pauseList: {
    padding: "0px",
    listStyle: "none",
    margin: "0px"
  },
  pauses: {
    textAlign: "center",
    padding: "25px 15px 0px 15px"
  },
  success: {
    color: theme.palette.success
  },
  warning: {
    color: theme.palette.warning
  }
});

export default style;
