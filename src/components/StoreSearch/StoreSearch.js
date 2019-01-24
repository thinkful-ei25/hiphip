import React from 'react';
import { connect } from 'react-redux';
import {
  searchStores,
  setUserLocation,
  searchStoresWithLocation,
} from '../../actions/yelpAPI';

import StoreResult from '../StoreResult';

export class StoreSearch extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setUserLocation());
  }

  renderResults() {
    if (this.props.error) {
      return <strong>{this.props.error.message}</strong>;
    }

    const stores = this.props.stores.map(store => (
      <StoreResult key={store.id} grocer={store} />
    ));

    return stores;
  }

  search(e) {
    e.preventDefault();
    let location = e.target.location.value;
    const searchTerm = e.target.searchTerm.value;
    if (this.input.value.trim() === '') {
      return;
    }
    if (this.props.userLocation) {
      this.props.dispatch(searchStores(searchTerm, this.props.userLocation));
    } else {
      this.props.dispatch(searchStoresWithLocation(searchTerm, location));
    }
  }

  render() {
    let locationField = (
      <input
        type="text"
        name="location"
        ref={location => (this.input = location)}
        placeholder="Address, City, State, Zip"
      />
    );
    if (this.props.userLocation) {
      locationField = <div>Using Current Location</div>;
    }
    return (
      <div className="store-search">
        <form onSubmit={e => this.search(e)}>
          <input
            type="search"
            name="searchTerm"
            ref={term => (this.input = term)}
            placeholder="Store Name..."
          />
          {locationField}
          <button>Search</button>
        </form>
        <ul className="store-search-results">{this.renderResults()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.yelpAPI.stores,
  loading: state.yelpAPI.loading,
  error: state.yelpAPI.error,
  userLocation: state.yelpAPI.userLocation,
});

export default connect(mapStateToProps)(StoreSearch);
