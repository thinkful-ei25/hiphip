import React from 'react';
import { connect } from 'react-redux';

import { setCurrentStore } from '../../actions/yelpAPI';

export class StoreResult extends React.Component {
  convertDistance(meters) {
    let answer = meters / 1609.344;
    answer = Math.floor(answer * 100) / 100;
    if (answer > 0.5) {
      return answer + ' miles away';
    } else {
      answer = answer * 5280;
      answer = Math.floor(answer / 100) * 100;
      return answer + ' feet away';
    }
  }

  handleClickedStore(e, store) {
    const { name, id, location, coordinates } = store;
    const newStore = {
      name,
      id,
      location,
      coordinates,
    };
    console.log(newStore);
    this.props.setCurrentStore(newStore);
  }

  render() {
    const { grocer: store } = this.props;

    const { name, location, id } = store;

    return (
      <li key={id} onClick={e => this.handleClickedStore(e, store)}>
        <strong>{name}</strong>
        <address>
          {location.address1} {location.address2}
          <br />
          {location.city}, {location.state} {location.zip_code}
        </address>
        <p>{this.convertDistance(store.distance)}</p>
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
