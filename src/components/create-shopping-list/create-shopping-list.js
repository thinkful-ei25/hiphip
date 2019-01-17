import React from 'react';

import NavBar from '../nav-bar';
import { CreateShoppingListForm } from '../create-shopping-list-form/create-create-shopping-list-form';

function CreateShoppingList() {
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

export default CreateShoppingList;
