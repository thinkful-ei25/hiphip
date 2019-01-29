import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/LoginPage';
import Lists from './components/Lists/Lists.js';
import Items from './components/Items';
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/lists/:listId" component={Items} />
        <Route path="/" component={LandingPage} />
      </Switch>
    );
  }
}

export default withRouter(App);
