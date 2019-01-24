import React from 'react';
import { connect } from 'react-redux';
import { searchStores, setUserLocation } from '../../actions/yelpAPI';

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
    const searchTerm = this.input.value;
    if (this.input.value.trim() === '') {
      return;
    }
    this.props.dispatch(searchStores(searchTerm, this.props.userLocation));
  }

  render() {
    let locationField = (
      <input type="text" id="loction" ref={input => (this.input = input)} />
    );
    if (this.props.userLocation) {
      locationField = <div>Using Current Location</div>;
    }
    return (
      <div className="store-search">
        <form onSubmit={e => this.search(e)}>
          <input type="search" id="name" ref={input => (this.input = input)} />
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
