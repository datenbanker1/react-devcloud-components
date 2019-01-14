import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Theme from "../../Theme";
import defaultStyle from "../../../styles/Layouts/EmptyPage";

class EmptyPage extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        <main>{content}</main>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  EmptyPage
);
