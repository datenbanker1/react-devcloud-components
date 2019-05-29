import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { DevCloud } from "@datenbanker/devcloud-client-lib";
import { Switch, Route } from "react-router-dom";
import LazyLoad from "../../../LazyLoad";
//DO NOT USE JSS IN THIS COMPONENT
//shouldComponentUpdate will breake classNaming
class AdminExtended extends Component {
  shouldComponentUpdate(nextProps) {
    //if location changes update
    if (
      nextProps.routing.location.pathname !==
      this.props.routing.location.pathname
    )
      return true;
    //if it is not a location change check if it is a config change
    if (nextProps.routes.length !== this.props.routes.length) return true;
    for (let i = 0; this.props.routes.length > i; i++) {
      const oldRoute = this.props.routes[i];
      const newRoute = nextProps.routes[i];

      if (JSON.stringify(oldRoute.paths) !== JSON.stringify(newRoute.paths))
        return true;
    }
    return false;
  }

  render() {
    const { routes } = this.props;
    const groups = DevCloud.getGroups();

    return (
      <Switch>
        {routes
          .filter(
            route =>
              !route.group || (route.group && groups.indexOf(route.group) > -1)
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
                        <div style={{ textAlign: "center" }}>
                          <CircularProgress />
                        </div>
                      }
                      component={route.component}
                      componentProps={{ setActions: this.props.setActions }}
                      js
                    />
                  )}
                />
              ))
            ];
          }, [])}
      </Switch>
    );
  }
}

export default AdminExtended;
