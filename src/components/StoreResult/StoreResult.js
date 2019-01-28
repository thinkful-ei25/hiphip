import React from 'react';
import { connect } from 'react-redux';

import DistanceDisplay from '../DistanceDisplay';
import { setCurrentStore } from '../../actions/yelpAPI';
import '../Lists/Lists.css';
export class StoreResult extends React.Component {
  handleClickedStore() {
    const { name, id, location, coordinates } = this.props.grocer;
    const newStore = {
      name,
      id,
      location,
      coordinates,
    };
    this.props.setCurrentStore(newStore);
  }

  render() {
    const { grocer: store, currentLocation } = this.props;

    const { name, location, id } = store;
    if (currentLocation) {
      return (
        <li
          key={id}
          onClick={() => this.handleClickedStore()}
          className="store-result"
        >
          <strong>{name}</strong>
          <address>
            {location.address1} {location.address2}
          </address>
          <p>
            <DistanceDisplay meters={store.distance} /> away
          </p>
        </li>
      );
    } else {
      return (
        <li
          key={id}
          onClick={() => this.handleClickedStore()}
          className="store-result"
        >
          <strong>{name}</strong>
          <address>
            {location.address1} {location.address2}
            <br />
            {location.city}, {location.state} {location.zip_code}
          </address>
        </li>
      );
    }
  }
}

const mapDispatchToProps = {
  setCurrentStore,
};

const mapStateToProps = state => ({
  userLocation: state.yelpAPI.userLocation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreResult);
