import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/auth-components/login-page';
import Lists from './components/Lists/Lists.js';
import Items from './components/Items';
import CreateShoppingList from './components/CreateShoppingList';
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/lists/create" component={CreateShoppingList} />
        <Route exact path="/lists/:listId" component={Items} />
      </Switch>
    );
  }
}

export default withRouter(App);
