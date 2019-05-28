import React, { Component } from "react";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Admin from "./layouts/Admin";
import AdminExtended from "./layouts/AdminExtended";
import EmptyPage from "./layouts/EmptyPage";
import AppBarOnly from "./layouts/AppBarOnly";
import Container from "../../container/Layouter";
import { BrowserRouter } from "react-router-dom";
import Theme from "../Theme";
import defaultStyle from "../../styles/Layouter";

class Layouter extends Component {
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getLayout(name, params) {
    switch (name) {
      case "admin":
        return <Admin {...params} />;
      case "admin-extended":
        return <AdminExtended {...params} />;
      case "emptyPage":
        return <EmptyPage {...params} />;
      case "appBarOnly":
        return <AppBarOnly {...params} />;
      default:
        console.log("LAYOUTER: layout not defined");
    }
  }

  render() {
    const { layout } = this.props;

    return (
      <MuiThemeProvider theme={Theme.convert("material-ui")}>
        <BrowserRouter>
          {this.getLayout(layout.name, { ...this.props })}
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(Theme.getStyle("Layouter", defaultStyle))(
  Container(Layouter)
);

export { Admin };
