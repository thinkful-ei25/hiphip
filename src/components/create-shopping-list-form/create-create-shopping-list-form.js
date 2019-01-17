import React from 'react';

export class CreateShoppingListForm extends React.Component {
  render() {
    return (
      <form
        className="CreateShoppingListForm"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name" className="CreateShoppingListForm-label">
          List name
          <input
            id="name"
            name="name"
            className="CreateShoppingListForm-input CreateShoppingListForm-input--name"
          />
        </label>
        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            className="CreateShoppingListForm-input CreateShoppingListForm-input--location"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
