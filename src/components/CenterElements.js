import React, { Component } from "react";

export default class CenterElements extends Component {
  render() {
    const { textAlign } = this.props;
    return (
      <div
        style={{
          display: "table",
          height: "100%",
          width: "100%",
          padding: "0px",
          margin: "0px"
        }}
      >
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            width: "100%",
            padding: "0px",
            margin: "0px",
            textAlign: textAlign || "left"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
