import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import Mobile from "./routes/mobile.jsx";

const { ConnectedRouter } = routerRedux;

const Routers = function({ history, app }) {
  const error = dynamic({
    app,
    component: () => import("./routes/error")
  });
  const routes = [
    {
      path: "/profile",
      models: () => [import("./models/profile")],
      component: () => import("./routes/mobile/profile.jsx")
    },
    {
      path: "/profile/detail/:id",
      models: () => [import("./models/profile")],
      component: () => import("./routes/mobile/profileView.jsx")
    },
    {
      path: "/profile/detail/:id/protocol",
      component: () => import("./routes/mobile/protocol.jsx")
    },
    {
      path: "/login",
      models: () => [import("./models/login")],
      component: () => import("./routes/mobile/login.jsx")
    },
    {
      path: "/agreement",
      component: () => import("./routes/mobile/agreement.jsx")
    },
    {
      path: "/agreement/detail",
      component: () => import("./routes/mobile/agreementDetail.jsx")
    },
    {
      path: "/register",
      // models: () => [import("./models/register")],
      component: () => import("./routes/mobile/register.jsx")
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <Mobile>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/profile" />}
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
  app: PropTypes.object
};

export default Routers;
