import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './CreateShoppingListForm.css';
import { createList } from '../../actions/shoppingLists';

export class CreateShoppingListForm extends React.Component {
  onSubmit(event) {
    const { dispatch, history, currentStore } = this.props;

    event.preventDefault();
    const name = event.target.name.value;
    const store = {
      name: currentStore.name,
      address: currentStore.location,
      googleId: currentStore.id,
    };

    dispatch(createList(name, store, history));
  }

  render() {
    const { currentStore } = this.props;
    const { name, location } = currentStore;

    return (
      <form
        className="CreateShoppingListForm"
        onSubmit={event => this.onSubmit(event)}
      >
        <fieldset>
          <legend>List</legend>
          <label htmlFor="name">
            List name
            <input id="name" name="name" />
          </label>
        </fieldset>
        <div className="selected-store">
          <p>Here is your current store for your list:</p>
          <strong>{name}</strong>
          <address>
            {location.address1} {location.address2}
            <br />
            {location.city}, {location.state} {location.zip_code}
          </address>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
    currentStore: state.yelpAPI.currentStore,
  };
};

export default withRouter(connect(mapStateToProps)(CreateShoppingListForm));
