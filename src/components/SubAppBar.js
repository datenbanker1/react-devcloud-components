import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Theme from "./Theme";
import defaultStyle from "../styles/SubAppBar";

class SubAppBar extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.holder = React.createRef();
    this.state = {
      barStyle: { display: "none" }
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this._isMounted = false;
  }

  updateDimensions() {
    let barStyle = { display: "none" };
    if (this.holder.current)
      barStyle = { width: this.holder.current.clientWidth };
    if (this._isMounted) this.setState({ ...this.state, barStyle });
  }

  render() {
    const { classes, children } = this.props;
    const { barStyle } = this.state;

    return (
      <div ref={this.holder} className={classes.holder}>
        <div className={classes.fixer} style={barStyle}>
          <div className={classes.childrenHolder}>{children}</div>
        </div>
        <div className={classes.placeholder} />
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("SubAppBar", defaultStyle))(SubAppBar);
