import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";
import Content from "./Content";

class AdminExtended extends Component {
  state = {
    actions: null
  };
  setActions = actions => {
    this.setState({ ...this.state, actions });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname)
      nextState.actions = null;

    return true;
  }
  render() {
    const { classes } = this.props;
    const routing = {
      location: this.props.location,
      match: this.props.match,
      history: this.props.history
    };

    return (
      <div className="admin-extended-layout">
        <div className={classes.bg} />
        <Navigation
          {...this.props.layout.props}
          links={this.props.links}
          routing={routing}
          actions={this.state.actions}
        />
        <Content
          routes={this.props.routes}
          routing={routing}
          setActions={this.setActions}
        />
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  withRouter(AdminExtended)
);
