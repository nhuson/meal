import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import history from './helpers/history'
import { Router, Route, Switch } from "react-router-dom";
import store from "./helpers/store"
import { PrivateRoute } from "./routes/privateRoute.jsx";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'

import indexRoutes from "routes/index.jsx";
import Login from "./containers/LoginContainer"

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: red[900]
    },
    primary: {
      main: red[700]
    }
  }
});

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
