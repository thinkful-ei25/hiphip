import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/auth-components/login-page';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
      </Switch>
    );
  }
}

export default withRouter(App);
