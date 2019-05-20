import React, { Component } from "react";
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom";
import Layouter from "./Layouter";
import Container from "../container/Router";
import { DevCloud } from "@datenbanker/devcloud-client-lib";

class Router extends Component {
  getVisibleLinks(group, pages) {
    return pages.reduce((links, link) => {
      if (
        (group && link.group && group.indexOf(link.group) === -1) ||
        link.inMenu === false
      )
        return [...links];
      else
        return [
          ...links,
          {
            path: link.path,
            aliasPath: link.aliasPath,
            name: link.name,
            icon: link.icon,
            pending: link.pending,
            elements: link.elements || false
          }
        ];
    }, []);
  }
  renderContent(page) {}
  renderRoutes(group, pages) {
    const groups = DevCloud.getGroups();
    return (
      <Switch>
        {pages.reduce((routes, page, index) => {
          if (groups && page.group && groups.indexOf(page.group) === -1)
            return [...routes];
          const generateRoutes = page => {
            return [
              <Route
                exact={true}
                key={"switch-" + index}
                path={page.path}
                component={withRouter(props => {
                  return (
                    <Layouter
                      {...this.props.layouter || {}}
                      layout={page.layout}
                      layoutProps={page.layoutProps}
                      links={this.getVisibleLinks(groups, pages)}
                      content={page.component}
                      icon={page.icon}
                      page={page.name}
                      breadCrumbs={page.breadCrumbs || []}
                      protected={page.protected}
                      authenticator={page.authenticator}
                      contentProps={page.props || {}}
                      routing={props}
                    />
                  );
                })}
              />,
              ...(page.aliasPath || []).map((alias, i) => {
                return (
                  <Route
                    exact={true}
                    key={"switch-alias-" + index + "-" + i}
                    path={alias}
                    component={withRouter(props => {
                      return (
                        <Layouter
                          {...this.props.layouter || {}}
                          layout={page.layout}
                          layoutProps={page.layoutProps}
                          links={this.getVisibleLinks(groups, pages)}
                          content={page.component}
                          icon={page.icon}
                          page={page.name}
                          breadCrumbs={page.breadCrumbs || []}
                          protected={page.protected}
                          authenticator={page.authenticator}
                          contentProps={page.props || {}}
                          routing={props}
                        />
                      );
                    })}
                  />
                );
              })
            ];
          };
          let toAdd = [...routes];
          if (page.elements)
            toAdd = [
              ...toAdd,
              ...page.elements.reduce((routes, page, index) => {
                return [...routes, ...generateRoutes(page)];
              }, [])
            ];

          if (page.path) {
            return [...toAdd, ...generateRoutes(page)];
          } else return [...toAdd];
        }, [])}
      </Switch>
    );
  }
  render() {
    const { group, pages } = this.props;
    return <BrowserRouter>{this.renderRoutes(group, pages)}</BrowserRouter>;
  }
}

export default Container(Router);
