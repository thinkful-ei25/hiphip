import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AddItem from './AddItem';
import { getItems, toggleChecked } from '../actions/items';
import NavBar from './nav-bar';
import AddAisle from './AddAisle';

const strikeThrough = { textDecoration: 'line-through' };
export class Items extends Component {
  toggleCheck(itemId) {
    this.props.dispatch(toggleChecked(itemId));
  }
  componentDidMount() {
    this.props.dispatch(getItems(this.props.listId));
  }
  render() {
    const { listId } = this.props;
    if (this.props.authLoading || this.props.items.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const items = this.props.items.items.map(item => {
      return (
        <li
          key={item.id}
          style={item.checked ? strikeThrough : null}
          onClick={() => this.toggleCheck(item.id)}
        >
          item: {item.name} aisle: {item.aisleLocation}
          {item.displayAddAisleForm ? (
            <AddAisle listId={listId} itemId={item.id} />
          ) : null}
        </li>
      );
    });
    let storeBlock;
    if (this.props.items.store) {
      storeBlock = (
        <h3>
          {this.props.items.store.name}
          {this.props.items.store.address}
        </h3>
      );
    }
    return (
      <Fragment>
        <NavBar />
        <h2>{this.props.items.name}</h2>
        {storeBlock}
        <ul>
          {items}
          <AddItem listId={listId} />
        </ul>
        <Link to="/lists">Lists</Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.match.params;
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    items: state.items,
    listId,
  };
};

export default connect(mapStateToProps)(Items);
