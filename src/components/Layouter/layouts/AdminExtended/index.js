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
  renderContent(content) {
    return !content.toCreate
      ? content
      : React.createElement(content.toCreate, {
          ...content.props,
          setActions: this.setActions
        });
  }
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
        <Content routes={this.props.routes} />
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtended
);
