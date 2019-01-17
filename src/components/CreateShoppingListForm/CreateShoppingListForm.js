import React from 'react';

import './CreateShoppingListForm.css';

export default class CreateShoppingListForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const store = {
      name: event.target['store-name'].value,
      address: event.target['store-address'].value,
      googleId: event.target['store-googleId'].value,
    };
  }

  render() {
    return (
      <form className="CreateShoppingListForm" onSubmit={this.onSubmit}>
        <fieldset>
          <legend>List</legend>
          <label htmlFor="name">
            List name
            <input id="name" name="name" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Store</legend>
          <label htmlFor="store-name">
            Store name
            <input id="store-name" name="store-name" />
          </label>
          <label htmlFor="store-address">
            Store address
            <input id="store-address" name="store-address" />
          </label>
          <label htmlFor="store-googleId">
            Google Place Id
            <input id="store-googleId" name="store-googleId" />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
