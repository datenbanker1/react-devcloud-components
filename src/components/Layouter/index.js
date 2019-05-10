import React, { Component } from "react";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Admin from "./layouts/Admin";
import AdminExtended from "./layouts/AdminExtended";
import EmptyPage from "./layouts/EmptyPage";
import AppBarOnly from "./layouts/AppBarOnly";
import { CircularProgress } from "@material-ui/core";
import CenterElements from "../CenterElements";
import Container from "../../container/Layouter";
import Authenticator from "../../components/Authenticator";

import Theme from "../Theme";
import defaultStyle from "../../styles/Layouter";

class Layouter extends Component {
  _isMounted = false;
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
    else this.props.dispatch(this.props.on, "contentLoaded");
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async loadContent() {
    const module = await this.props.content();
    const content = {
      ...this.state.content,
      pending: false,
      error: false,
      toCreate: module.default
    };
    if (this._isMounted) this.setState({ ...this.state, content });
    this.props.dispatch(this.props.on, "contentLoaded");
  }
  getLayout(name, params) {
    switch (name) {
      case "admin":
        return (
          <Admin
            {...params}
            signOut={() => this.props.dispatch(this.props.on, "signOut")}
          />
        );
      case "admin-extended":
        return (
          <AdminExtended
            {...params}
            signOut={() => this.props.dispatch(this.props.on, "signOut")}
          />
        );
      case "emptyPage":
        return <EmptyPage {...params} />;
      case "appBarOnly":
        return (
          <AppBarOnly
            {...params}
            signOut={() => this.props.dispatch(this.props.on, "signOut")}
          />
        );
      default:
        console.log("LAYOUTER: layout not defined");
    }
  }
  protectSite(authenticator, content) {
    return (
      <Authenticator {...authenticator.props || {}}>{content}</Authenticator>
    );
  }
  renderPendingContent() {
    const { classes } = this.props;
    return (
      <div className={classes.pendingIconWrapper}>
        <CenterElements textAlign="center">
          <CircularProgress size={60} />
        </CenterElements>
      </div>
    );
  }
  render() {
    const {
      layout,
      page,
      links,
      contentProps,
      routing,
      layoutProps,
      authenticator = {}
    } = this.props;
    const { content } = this.state;
    const site = (
      <div>
        {this.getLayout(layout, {
          page: page || "",
          links: links || [],
          layoutProps: layoutProps || {},
          content: !content.pending
            ? layout === "admin-extended"
              ? {
                  toCreate: content.toCreate,
                  props: {
                    ...contentProps,
                    routing
                  }
                }
              : React.createElement(content.toCreate, {
                  ...contentProps,
                  routing
                })
            : this.renderPendingContent(),
          routing
        })}
      </div>
    );
    return (
      <MuiThemeProvider theme={Theme.convert("material-ui")}>
        {this.props.protected ? this.protectSite(authenticator, site) : site}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(Theme.getStyle("Layouter", defaultStyle))(
  Container(Layouter)
);

export { Admin };
