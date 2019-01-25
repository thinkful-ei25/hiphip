import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteList } from '../../actions/shoppingLists';
import '../component.css';

import CoordinateDistance from '../CoordinateDistance';

export class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
    };
  }

  deleteClicked() {
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  }

  confirmDelete() {
    this.props.deleteList(this.props.id);
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  }

  render() {
    const {
      id,
      groceryStore: store,
      name,
      userLocation,
      online,
      availableOffline,
    } = this.props;

    let deleteButton = (
      <button disabled={!online} onClick={() => this.deleteClicked()}>
        <img className="deleteIcon" src="/delete.png" />
      </button>
    );
    if (this.state.deleteModal) {
      deleteButton = (
        <div>
          <button onClick={() => this.confirmDelete()}>Confirm Delete</button>
          <button onClick={() => this.deleteClicked()}>Cancel</button>
        </div>
      );
    }

    const linkBody = (
      <Fragment>
        <div>{name}</div>
        <div>
          {store !== null ? store.name + ' - ' : store}
          {store !== null ? store.address.address1 : store}
        </div>
        {store && store.coordinates && (
          <div className="distanceFromStore">
            <CoordinateDistance
              userLocation={userLocation}
              point={store.coordinates}
            />{' '}
            away
          </div>
        )}
        {deleteButton}
      </Fragment>
    );

    return (
      <li key={id} className="ShoppingList">
        {online || availableOffline ? (
          <Link to={`/lists/${id}`}>{linkBody}</Link>
        ) : (
          <div>{linkBody}</div>
        )}
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userLocation: state.yelpAPI.userLocation,
  online: state.connectivity.online,
  availableOffline: state.items.listId === ownProps.id,
});

const mapDispatchToProps = {
  deleteList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
