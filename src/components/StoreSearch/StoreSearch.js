import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchStores } from '../../actions/storesAPI';

export class StoreSearch extends Component {
  renderResults() {
    if (this.props.error) {
      return <strong>{this.props.error}</strong>;
    }

    const stores = this.props.stores.map((store, index) => (
      <li key={index}>{store}</li>
    ));

    return stores;
  }

  search(e) {
    e.preventDefault();
    if (this.input.value.trim() === '') {
      return;
    }
    this.props.dispatch(searchStores(this.input.value));
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
  stores: state.storesAPI.stores,
  loading: state.storesAPI.loading,
  error: state.storesAPI.error,
});

export default connect(mapStateToProps)(StoreSearch);
