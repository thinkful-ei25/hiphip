import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList } from '../../actions/shoppingLists';
import CoordinateDistance from '../CoordinateDistance';

import '../Lists/Lists.css';
import './ShoppingList.css';
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

  linkToList(event, id) {
    this.props.history.push(`/lists/${id}`);
  }
  render() {
    const { id, groceryStore: store, name, userLocation } = this.props;

    let deleteButton = (
      <i
        className="fas fa-times fa-2x delete-icon"
        onClick={e => {
          e.stopPropagation();
          this.deleteClicked();
        }}
        title="Delete list"
      />
    );
    if (this.state.deleteModal) {
      deleteButton = (
        <div className="list-delete-btn">
          <button
            id="confirmDelete"
            onClick={e => {
              e.stopPropagation();
              this.confirmDelete();
            }}
          >
            Confirm Delete
          </button>
          <button
            id="cancelDelete"
            onClick={e => {
              e.stopPropagation();
              this.deleteClicked();
            }}
          >
            Cancel
          </button>
        </div>
      );
    }
    return (
      <li
        key={id}
        className="ShoppingList"
        onClick={e => this.linkToList(e, id)}
      >
        <div className="list-title">{name}</div>
        <div className="list-store">
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
      </li>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.yelpAPI.userLocation,
});

const mapDispatchToProps = {
  deleteList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
