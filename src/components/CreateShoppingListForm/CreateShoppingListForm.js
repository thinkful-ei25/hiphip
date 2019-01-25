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
    let clearButton;
    let submitButton;
    if (!currentStore) {
      search = (
        <div className="search-container">
          <p className="search-question">
            Would you like a store for your list?
          </p>
          <StoreSearch />
        </div>
      );
      submitButton = <button type="submit">Create List with no Store</button>;
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
        </div>
      );
      clearButton = (
        <button onClick={() => this.newStore()}>Select another store</button>
      );
      submitButton = <button type="submit">Create List</button>;
    }

    return (
      <div className="CreateShoppingListForm-container">
        <form
          className="CreateShoppingListForm"
          onSubmit={event => this.onSubmit(event)}
        >
          <label htmlFor="name" className="name-label">
            List name
            <input id="name" name="name" />
          </label>
          {storeDisplay}
          {clearButton}
          {submitButton}
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
