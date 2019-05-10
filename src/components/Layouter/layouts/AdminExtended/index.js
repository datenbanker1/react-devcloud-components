import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Navigation from "./Navigation";

import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";

class AdminExtended extends Component {
  state = {
    subNavigation: null
  };
  setSubNavigation = content => {
    this.setState({ ...this.state, subNavigation: content });
  };
  renderContent(content) {
    const setSubNavigation = this.setSubNavigation;
    return !content.toCreate
      ? content
      : React.createElement(content.toCreate, {
          ...content.props,
          setSubNavigation
        });
  }
  render() {
    const { content, classes } = this.props;
    const subNavigation = this.state.subNavigation;
    return (
      <div className="admin-extended-layout">
        <Navigation {...this.props} />
        <main className={classes.main}>
          <div className={classes.content}>{this.renderContent(content)}</div>
        </main>
        <div className={classNames([classes.subNavigation])}>
          {subNavigation}
        </div>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtended
);
