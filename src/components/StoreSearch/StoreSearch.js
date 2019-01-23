import React from 'react';
import { connect } from 'react-redux';
import { searchStores } from '../../actions/yelpAPI';

import StoreResult from '../StoreResult';

export class StoreSearch extends React.Component {
  getPosition(options) {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  renderResults() {
    if (this.props.error) {
      return <strong>{this.props.error}</strong>;
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
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    this.getPosition(options)
      .then(pos => {
        const coords = pos.coords;
        this.props.dispatch(searchStores(searchTerm, coords));
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  render() {
    return (
      <div className="store-search">
        <form onSubmit={e => this.search(e)}>
          <input type="search" ref={input => (this.input = input)} />
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
});

export default connect(mapStateToProps)(StoreSearch);
