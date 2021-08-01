import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import Login from "auth/Login";
import Register from "auth/Register";
const auth=sessionStorage.getItem('token');

const PrivateRoute = ({ component: IncomingComponent, ...rest }) => (
  <Route {...rest}
  render={props => ( !auth ? (<IncomingComponent {...props} />) : (
      <Redirect to={{pathname: '/admin/user-page', state: { from: props.location }, }}/>)
  )}
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path='/admin/login' component={Login}/>
      {/* <Route exact path='/register' component={Register}/> */}
      <Route path="/admin" render={(props) =>auth? <AdminLayout {...props} />:(<Redirect to={'/admin/login'}/>)} />
      <Redirect to="/admin/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
