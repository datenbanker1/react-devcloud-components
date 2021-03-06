const style = theme => materialUiTheme => ({
  menu: {
    backgroundColor: "initial"
  },
  icon: {
    fontSize: "1.6em"
  },
  pendingHolder: {
    textAlign: "center",
    paddingTop: "50px"
  },
  stateIcon: {
    fontSize: "3rem",
    marginBottom: "10px"
  },
  default: {
    color: theme.palette.default
  },
  danger: {
    color: theme.palette.danger
  },
  historyHolder: {
    paddingLeft: "20px",
    "@media (max-width: 512px)": {
      paddingLeft: "10px"
    }
  },
  historyList: {
    listStyle: "none",
    borderLeft: "4px solid " + theme.palette.default,
    paddingLeft: "25px",
    marginTop: "0px",
    paddingBottom: "16px",
    "@media (max-width: 512px)": {
      paddingLeft: "6px"
    }
  },
  historyElement: {
    backgroundColor: "#fff",
    padding: "8px",
    margin: "0px 0px 16px 0px",
    borderRadius: "4px"
  },
  historyListItemIndicator: {
    position: "absolute",
    height: "10px",
    width: "10px",
    backgroundColor: "#fff",
    margin: "10px 0px 0px -18px",
    borderRadius: "20px 0px 0px 20px",
    "&:before": {
      borderRight: "3px solid #fff",
      borderBottom: "3px solid #fff",
      width: "10px",
      height: "10px",
      margin: "-8px 0px 0px 0px",
      borderRadius: "0px 0px 20px 0px",
      display: "block",
      content: '""',
      "@media (max-width: 512px)": {
        display: "none"
      }
    },
    "&:after": {
      borderTop: "3px solid #fff",
      borderRight: "3px solid #fff",
      width: "10px",
      height: "10px",
      margin: "0px 0px 0px 0px",
      borderRadius: "0px 20px 0px 0px",
      display: "block",
      content: '""',
      "@media (max-width: 512px)": {
        display: "none"
      }
    },
    "@media (max-width: 512px)": {
      backgroundColor: "initial"
    }
  },
  historyListItemCircleHolder: {
    position: "absolute",
    margin: "-12px 0px 0px -29px",
    borderRadius: "40px",
    padding: "0px 0px",
    backgroundColor: theme.palette.primary,
    "@media (max-width: 512px)": {
      margin: "-10px 0px 0px -10px"
    }
  },
  historyListItemCircle: {
    display: "block",
    borderRadius: "20px",
    width: "16px",
    height: "16px",
    border: "4px solid " + theme.palette.primary,
    backgroundColor: theme.palette.primary
  },
  historyYearFlag: {
    position: "relative",
    left: "-49px",
    padding: "2px 5px",
    display: "inline-block",
    border: "3px solid " + theme.palette.danger,
    backgroundColor: "rgba(255, 255, 255, 1)",
    "@media (max-width: 512px)": {
      left: "-20px"
    }
  },
  historyYearFlagHolder: {
    marginBottom: "16px"
  }
});

export default style;
