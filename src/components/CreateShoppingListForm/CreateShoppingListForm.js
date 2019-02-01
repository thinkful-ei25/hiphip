import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import StoreSearch from '../StoreSearch';

import { createList } from '../../actions/shoppingLists';
import { clearCurrentStore, clearStores } from '../../actions/yelpAPI';
import { queryCreator, googleMapsSearch } from './utils';

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
    dispatch(clearStores());
  }

  render() {
    const { currentStore, error } = this.props;
    let storeDisplay;
    let search;
    let clearButton;
    let submitButton;
    let errorPrompt;
    if (
      error &&
      error.message === 'Missing field' &&
      error.location === 'name'
    ) {
      errorPrompt = (
        <div className="error-prompt">
          <strong>Name is a required field</strong>
        </div>
      );
    }
    if (!currentStore) {
      search = (
        <div className="search-container">
          <p className="search-question">
            Select a store for your list (optional):
          </p>
          <StoreSearch />
        </div>
      );
      submitButton = (
        <button className="no-store-submit" type="submit">
          Create List with no Store
        </button>
      );
    } else {
      const { name, location } = currentStore;
      const toBeQuery = [
        queryCreator(name),
        queryCreator(location.address1),
        location.zip_code,
      ];
      const query = toBeQuery.join('%2C+');

      storeDisplay = (
        <div className="selected-store">
          <p>Selected store:</p>
          <strong className="storeTitle">{name}</strong>
          <a
            className="google-maps-link"
            target="_blank"
            rel="noopener noreferrer"
            href={googleMapsSearch + query}
          >
            <address>
              {location.address1} {location.address2}
              <br />
              {location.city}, {location.state} {location.zip_code}
            </address>
          </a>
        </div>
      );
      clearButton = (
        <button className="select-new-store" onClick={() => this.newStore()}>
          Select another store
        </button>
      );
      submitButton = (
        <button type="submit" className="create-list">
          Create List
        </button>
      );
    }

    return (
      <div className="CreateShoppingListForm-container">
        <form
          className="CreateShoppingListForm"
          onSubmit={event => this.onSubmit(event)}
        >
          <label htmlFor="name" className="name-label">
            List name
          </label>
          {errorPrompt}
          <input id="name" name="name" data-lpignore="true" />
          {storeDisplay}
          {clearButton} <br />
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
    error: state.lists.error,
  };
};

export default withRouter(connect(mapStateToProps)(CreateShoppingListForm));
