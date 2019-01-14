import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Admin from "./layouts/Admin";
import EmptyPage from "./layouts/EmptyPage";
import Theme from "../Theme";

class Layouter extends Component {
  constructor(props) {
    super(props);
    const loadContentAsync = typeof props.content === "function";
    this.state = {
      content: {
        pending: loadContentAsync,
        toCreate: !loadContentAsync ? props.content : null,
        error: false
      }
    };
    this.loadContent = this.loadContent.bind(this);
    if (loadContentAsync) this.loadContent();
  }
  async loadContent() {
    const module = await this.props.content();
    const content = {
      ...this.state.content,
      pending: false,
      error: false,
      toCreate: module.default
    };
    this.setState({ ...this.state, content });
  }
  getLayout(name, params) {
    switch (name) {
      case "admin":
        return <Admin {...params} />;
      case "emptyPage":
        return <EmptyPage {...params} />;
    }
  }

  render() {
    const { layout, page, links, contentProps, routing } = this.props;
    const { content } = this.state;

    return (
      <MuiThemeProvider theme={Theme.convert("material-ui")}>
        <div>
          {this.getLayout(layout, {
            page: page || "",
            links: links || [],
            content: !content.pending
              ? React.createElement(content.toCreate, { ...contentProps })
              : "pending",
            routing
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layouter;
export { Admin };
