const style = theme => materialUiTheme => ({
  wrapper: {
    overflow: "hidden",
    height: "46px"
  },
  holder: {
    margin: "0px 4px"
  },
  recordsPerPageHolder: {
    textAlign: "left"
  },
  paginationHolder: {
    textAlign: "right",
    whiteSpace: "nowrap",
    overflowX: "scroll"
  },
  menu: {
    border: "1px solid " + theme.palette.default
  },
  paginationBtn: {
    margin: "4px 0px",
    padding: "6px 12px",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: "38px",
    height: "38px",
    minWidth: "inherit",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.primary,
      color: "#fff"
    }
  },
  paginationBtnDisabled: {
    color: theme.palette.default,
    cursor: "not-allowed",
    "&:hover": {
      color: theme.palette.default,
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  },
  paginationBtnActive: {
    color: theme.palette.secondary
  },
  paginationLabel: {
    lineHeight: "1.5rem"
  },
  RecordsPerPageText: {
    display: "inline-block",
    color: theme.palette.fontSubtle,
    margin: "4px 4px",
    cursor: "pointer",
    marginTop: "14px",
    "&:hover": {
      color: theme.palette.primary
    }
  },
  text: {
    display: "inline-block",
    color: theme.palette.fontSubtle,
    margin: "4px 4px"
  },
  "@media (max-width: 599px)": {
    RecordsPerPageText: {
      marginTop: "4px"
    },
    recordsPerPageHolder: {
      textAlign: "right"
    }
  }
});

export default style;
