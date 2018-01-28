import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import Mobile from "./routes/mobile";

const { ConnectedRouter } = routerRedux;

const Routers = function({ history, mobile }) {
  const error = dynamic({
    mobile,
    component: () => import("./routes/error")
  });
  const routes = [
    {
      path: "/users",
      models: () => [import("./models/users")],
      component: () => import("./routes/users/index")
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Mobile>
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
      </Mobile>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  mobile: PropTypes.object
};

export default Routers;
