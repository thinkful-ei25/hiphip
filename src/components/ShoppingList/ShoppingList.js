import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteList } from '../../actions/shoppingLists';
import '../component.css';

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
    const { id, groceryStore: store, name } = this.props;

    let deleteButton = (
      <button onClick={() => this.deleteClicked()}>
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
    return (
      <li key={id}>
        <Link to={`/lists/${id}`}>
          <div>{name}</div>
          <div>
            {store !== null ? store.name + ' - ' : store}
            {store !== null ? store.address.address1 : store}
          </div>
        </Link>
        {deleteButton}
      </li>
    );
  }
}

const mapDispatchToProps = {
  deleteList,
};

export default connect(
  null,
  mapDispatchToProps
)(ShoppingList);
