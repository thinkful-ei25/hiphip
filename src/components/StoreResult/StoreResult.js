import React from 'react';
import { connect } from 'react-redux';

import DistanceDisplay from '../DistanceDisplay';
import { setCurrentStore } from '../../actions/yelpAPI';

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
    const { grocer: store } = this.props;

    const { name, location, id } = store;

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
        <p>
          <DistanceDisplay meters={store.distance} /> away
        </p>
      </li>
    );
  }
}

const mapDispatchToProps = {
  setCurrentStore,
};

export default connect(
  null,
  mapDispatchToProps
)(StoreResult);
