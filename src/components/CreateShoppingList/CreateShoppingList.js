import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NavBar from '../nav-bar';
import CreateShoppingListForm from '../CreateShoppingListForm';

function CreateShoppingList({ user, loggingIn }) {
  if (loggingIn) {
    return <div>Logging in</div>;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

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

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  loggingIn: state.auth.loading,
});

export default connect(mapStateToProps)(CreateShoppingList);
