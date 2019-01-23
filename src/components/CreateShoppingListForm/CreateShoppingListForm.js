import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import StoreSearch from '../StoreSearch';

import './CreateShoppingListForm.css';
import { createList } from '../../actions/shoppingLists';
import { clearCurrentStore } from '../../actions/yelpAPI';

export class CreateShoppingListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wantStore: false };
  }

  onSubmit(event) {
    const { dispatch, history, currentStore } = this.props;
    let store;
    console.log(this.state.wantStore);
    event.preventDefault();
    const name = event.target.name.value;
    if (currentStore) {
      store = {
        name: currentStore.name,
        address: currentStore.location,
        googleId: currentStore.id,
      };
    } else {
      store = null;
    }

    dispatch(createList(name, store, history));
  }

  newStore() {
    const { dispatch } = this.props;
    console.log('hi there, i cleared the currentStore');
    dispatch(clearCurrentStore());
  }

  render() {
    const { currentStore } = this.props;
    let storeDisplay;
    let search;
    if (!currentStore) {
      search = (
        <div>
          <p>Search for a store</p>
          <StoreSearch />
        </div>
      );
    } else {
      const { name, location } = currentStore;
      storeDisplay = (
        <div className="selected-store">
          <p>Here is your current store for your list:</p>
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
