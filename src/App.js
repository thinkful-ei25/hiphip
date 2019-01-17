import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/auth-components/login-page';
import Dashboard from './components/dashboard';
import List from './components/list';
import CreateShoppingList from './components/create-shopping-list';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/lists" component={Dashboard} />
        <Route exact path="/lists/create" component={CreateShoppingList} />
        <Route exact path="/lists/:listId" component={List} />
      </Switch>
    );
  }
}

export default withRouter(App);
