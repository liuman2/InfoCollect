import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import App from "./routes/app";

const { ConnectedRouter } = routerRedux;

const Routers = function({ history, app }) {
  const error = dynamic({
    app,
    component: () => import("./routes/error")
  });
  const routes = [
    {
      path: "/users",
      models: () => [import("./models/users")],
      component: () => import("./routes/users/index")
    },
    {
      path: "/users/detail/:id",
      models: () => [import("./models/userDetail")],
      component: () => import("./routes/users/userDetail")
    },
    {
      path: "/users/create",
      models: () => [import("./models/userDetail")],
      component: () => import("./routes/users/userDetail")
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/users" />}
          />
          {routes.map(({ path, ...dynamics }, key) => (
            <Route
              key={key}
              exact
              path={path}
              component={dynamic({ app, ...dynamics })}
            />
          ))}
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
