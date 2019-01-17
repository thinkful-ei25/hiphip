import React from 'react';

import NavBar from '../nav-bar';
import CreateShoppingListForm from '../CreateShoppingListForm';

function CreateShoppingList(props) {
  return (
    <div className="CreateShoppingList">
      <NavBar />
      <main>
        <header>
          <h1 className="CreateShoppingList-pageTitle">New shopping list</h1>
        </header>
        <CreateShoppingListForm history={props.history} />
      </main>
    </div>
  );
}

export default CreateShoppingList;
