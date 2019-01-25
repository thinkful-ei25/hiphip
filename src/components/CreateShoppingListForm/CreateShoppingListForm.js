import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import StoreSearch from '../StoreSearch';

import './CreateShoppingListForm.css';
import { createList } from '../../actions/shoppingLists';
import { clearCurrentStore } from '../../actions/yelpAPI';

export class CreateShoppingListForm extends React.Component {
  onSubmit(event) {
    const { dispatch, history, currentStore } = this.props;
    let store = null;
    event.preventDefault();
    const name = event.target.name.value;
    if (currentStore) {
      store = {
        name: currentStore.name,
        address: currentStore.location,
        yelpId: currentStore.id,
        coordinates: currentStore.coordinates,
      };
    }

    dispatch(createList(name, store, history));
  }

  newStore() {
    const { dispatch } = this.props;
    dispatch(clearCurrentStore());
  }

  render() {
    const { currentStore } = this.props;
    let storeDisplay;
    let search;
    if (!currentStore) {
      search = (
        <div>
          Would you like a store for your list?
          <StoreSearch />
        </div>
      );
    } else {
      const { name, location } = currentStore;
      storeDisplay = (
        <div className="selected-store">
          <p>Selected store:</p>
          <strong>{name}</strong>
          <address>
            {location.address1} {location.address2}
            <br />
            {location.city}, {location.state} {location.zip_code}
          </address>
          <button onClick={() => this.newStore()}>Select another store</button>
        </div>
      );
    }

    return (
      <div>
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
          {storeDisplay}
          <button type="submit">Create List</button>
        </form>
        {search}
      </div>
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
