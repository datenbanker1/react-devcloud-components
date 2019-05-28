import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
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
  render() {
    const { classes } = this.props;
    return (
      <div className="admin-extended-layout">
        <div className={classes.bg} />
        <Navigation
          {...this.props.layout.props}
          links={this.props.links}
          actions={this.state.actions}
        />
        <Content routes={this.props.routes} setActions={this.setActions} />
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtended
);
