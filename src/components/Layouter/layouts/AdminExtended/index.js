import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Navigation from "./Navigation";

import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";

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
    const { content, classes } = this.props;
    const hasBtns = !!this.state.actions;
    return (
      <div className="admin-extended-layout">
        <Navigation {...this.props} actions={this.state.actions} />
        <main
          className={classNames([
            classes.main,
            hasBtns && classes.mainActionsResp
          ])}
        >
          <div className={classes.content}>{this.renderContent(content)}</div>
        </main>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtended
);
