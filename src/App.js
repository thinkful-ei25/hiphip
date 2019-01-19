import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import RegistrationPage from './components/auth-components/registration-page';
import LoginPage from './components/auth-components/login-page';
import Lists from './components/Lists';
import Items from './components/Items';
import CreateShoppingList from './components/CreateShoppingList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo);
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/lists/:listId" component={Items} />
        <Route exact path="/lists/create" component={CreateShoppingList} />
      </Switch>
    );
  }
}

export default withRouter(App);
