const style = theme => materialUiTheme => {
  return {
    overlay: {
      position: "absolute",
      display: "block",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    }
  };
};

export default style;
