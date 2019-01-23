import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NavBar from '../nav-bar';
import CreateShoppingListForm from '../CreateShoppingListForm';
import StoreSearch from '../StoreSearch';

function CreateShoppingList({ user, loggingIn, currentStore }) {
  if (loggingIn) {
    return <div>Logging in</div>;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (currentStore === null) {
    return (
      <div className="CreateShoppingList">
        <NavBar />
        <main>
          <header>
            <h1 className="CreateShoppingList-pageTitle">Select a Store</h1>
          </header>
          <StoreSearch />
        </main>
      </div>
    );
  } else {
    return (
      <div className="CreateShoppingList">
        <NavBar />
        <main>
          <header>
            <h1 className="CreateShoppingList-pageTitle">New shopping list</h1>
          </header>
          <CreateShoppingListForm />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  loggingIn: state.auth.loading,
  currentStore: state.yelpAPI.currentStore,
});

export default connect(mapStateToProps)(CreateShoppingList);
