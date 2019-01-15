import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/auth-components/login-page';
import Dashboard from './components/dashboard';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default withRouter(App);
