import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CreateShoppingListForm from '../CreateShoppingListForm';
import './CreateShoppingList.css';
function CreateShoppingList({ user, loggingIn, currentStore }) {
  if (loggingIn) {
    return <div>Logging in</div>;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="CreateShoppingList">
      <header>
        <h2 className="CreateShoppingList-pageTitle">New shopping list</h2>
      </header>
      <CreateShoppingListForm />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  loggingIn: state.auth.loading,
  currentStore: state.yelpAPI.currentStore,
});

export default connect(mapStateToProps)(CreateShoppingList);
