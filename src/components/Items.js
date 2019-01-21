import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AddItem from './AddItem';
import { getItems, toggleChecked, displayAislePrompt } from '../actions/items';
import NavBar from './nav-bar';
import AddAisle from './AddAisle';

const strikeThrough = { textDecoration: 'line-through' };

export class Items extends Component {
  onClickHandler(item) {
    const { dispatch, listId } = this.props;
    if (!item.isChecked && !item.aisleLocation) {
      dispatch(displayAislePrompt(item));
    }
    dispatch(toggleChecked(item.id, listId));
  }

  componentDidMount() {
    const { dispatch, listId } = this.props;
    dispatch(getItems(listId));
  }

  render() {
    const {
      authLoading,
      items,
      listId,
      loading,
      name,
      store,
      username,
      aislePrompt,
    } = this.props;

    if (authLoading || loading) {
      return <div>Loading...</div>;
    }

    if (!username) {
      return <Redirect to="/" />;
    }

    const itemElements = items.map(item => {
      return (
        <li
          key={item.id}
          style={item.isChecked ? strikeThrough : null}
          onClick={() => this.onClickHandler(item)}
        >
          {item.name}
          {item.aisleLocation}
        </li>
      );
    });

    let storeBlock;
    if (store) {
      storeBlock = (
        <h3>
          {name}
          {store.address}
        </h3>
      );
    }
    return (
      <Fragment>
        <NavBar />
        <main>
          <h1>{name}</h1>
          {storeBlock}
          <h3>item: aisle:</h3>
          <ul>
            {itemElements}
            <AddItem listId={listId} />
          </ul>
          {aislePrompt ? <AddAisle listId={listId} /> : null}
        </main>
        <Link to="/lists">Lists</Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.match.params;
  const { items, loading, store, name, aislePrompt } = state.items;
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    items,
    loading,
    store,
    name,
    listId,
    aislePrompt,
  };
};

export default connect(mapStateToProps)(Items);
