import React, { Component } from "react";
import { withStyles, CircularProgress } from "@material-ui/core";
import { DevCloud } from "@datenbanker/devcloud-client-lib";
import { Switch, Route } from "react-router-dom";
import LazyLoad from "../../../LazyLoad";
import Theme from "../../../Theme";
import defaultStyle from "../../../../styles/Layouts/AdminExtended";

class AdminExtended extends Component {
  render() {
    const { classes, routes } = this.props;
    const groups = DevCloud.getGroups();
    return (
      <main className={classes.main}>
        <div className={classes.content}>
          <Switch>
            {routes
              .filter(
                route =>
                  !route.group ||
                  (route.group && groups.indexOf(route.group) > -1)
              )
              .reduce((accu, route, i) => {
                return [
                  ...accu,
                  ...route.paths.map((path, n) => (
                    <Route
                      exact={true}
                      key={`switch-route-${i}-path-${n}`}
                      path={path}
                      component={() => (
                        <LazyLoad
                          placeholder={
                            <div className={classes.alignCenter}>
                              <CircularProgress />
                            </div>
                          }
                          component={route.component}
                          js
                        />
                      )}
                    />
                  ))
                ];
              }, [])}
          </Switch>
        </div>
      </main>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AdminExtended
);
