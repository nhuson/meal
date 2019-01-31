import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import history from './helpers/history'
import { Router, Route, Switch } from "react-router-dom"
import store from "./helpers/store"
import { PrivateRoute } from "./routes/privateRoute.jsx"
import { PublicRoute } from "./routes/publicRoute.jsx"
import indexRoutes from "routes/index.jsx";
import Login from "./containers/LoginContainer"


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        {indexRoutes.map((prop, key) => {
          return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
)
