import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import history from './helpers/history'
import { Router, Route, Switch } from "react-router-dom";
import store from "./helpers/store"
import { PrivateRoute } from "./routes/privateRoute.jsx";
import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import Login from "./containers/Auth/LoginContainer"


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        {indexRoutes.map((prop, key) => {
          return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
)
