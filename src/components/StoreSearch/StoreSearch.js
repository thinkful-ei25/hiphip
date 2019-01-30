import React from 'react';
import { connect } from 'react-redux';
import {
  searchStores,
  setUserLocation,
  searchStoresWithLocation,
} from '../../actions/yelpAPI';

import '../Lists/Lists.css';

import StoreResult from '../StoreResult';
import LoadingSpinner from '../LoadingSpinner';

export class StoreSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usingUserLocation: true, madeSearch: false };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setUserLocation()).then(userCoordinates => {
      if (userCoordinates) {
        dispatch(searchStores('grocery store', userCoordinates));
      }
    });
  }

  toggleSearch() {
    this.setState({ madeSearch: true });
  }

  renderResults() {
    if (this.props.error && this.state.madeSearch) {
      return <div className="error-prompt">You must enter a location!</div>;
    }
    if (this.props.loading) {
      return <LoadingSpinner className="loading-spinner" />;
    }

    let { usingUserLocation } = this.state;

    let stores = [];
    if (this.props.stores) {
      stores = this.props.stores.map(store => (
        <StoreResult
          key={store.id}
          grocer={store}
          currentLocation={usingUserLocation}
        />
      ));
    }

    return stores;
  }

  search(e) {
    e.preventDefault();
    let location = e.target.location.value;
    let searchTerm = e.target.searchTerm.value;
    if (searchTerm.trim() === '') {
      searchTerm = 'grocery';
    }
    if (this.props.userLocation && location.trim() === '') {
      this.props.dispatch(searchStores(searchTerm, this.props.userLocation));
      this.setState({ usingUserLocation: true });
    } else {
      this.props.dispatch(searchStoresWithLocation(searchTerm, location));
      this.setState({ usingUserLocation: false });
    }
    this.toggleSearch();
  }

  render() {
    let placeholderText = '1600 Pennsylvania Ave';
    let locationClass = 'location-white fas fa-location-arrow';
    if (this.props.userLocation) {
      locationClass = 'location-blue fas fa-location-arrow';
    }

    return (
      <div className="store-search">
        <form className="store-search-form" onSubmit={e => this.search(e)}>
          <label for="name" className="store-name-label">
            Store Name
          </label>
          <input
            type="search"
            name="searchTerm"
            ref={term => (this.input = term)}
            placeholder="Albertson's, Whole Foods, etc."
          />
          <br />
          <label for="location" className="store-location-label">
            Location
          </label>
          <i className={locationClass} />
          <input
            type="text"
            name="location"
            ref={location => (this.input = location)}
            placeholder={placeholderText}
          />
          <br />
          <button className="button--submit search-button">Search</button>
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
