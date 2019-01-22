import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AddItem from './AddItem';
import { getItems, toggleChecked, displayAislePrompt } from '../actions/items';
import NavBar from './nav-bar';
import AddAisle from './AddAisle';
import './component.css';
import ShoppingListItem from './ShoppingListItem';

export class Items extends Component {
  onClickHandler(item) {
    const { dispatch, listId } = this.props;
    if (!item.isChecked && item.aisleLocation && !item.aisleLocation.aisleNo) {
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
        <li key={item.id}>
          <ShoppingListItem
            item={item}
            onClick={() => this.onClickHandler(item)}
          />
        </li>
      );
    });

    let storeBlock;
    if (store) {
      storeBlock = (
        <h3>
          {store.name}
          {store.address}
        </h3>
      );
    }
    return (
      <Fragment>
        <NavBar />
        <main>
          <div className="listTitle">
            <h1>{name}</h1>
            {storeBlock}
          </div>
          <div>
            <h3 className="item">item: </h3>
            <h3 className="item aisle">aisle:</h3>
          </div>
          <ul>
            {itemElements}
            <AddItem listId={listId} />
          </ul>
          {aislePrompt ? <AddAisle listId={listId} /> : null}
        </main>
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
