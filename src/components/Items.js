import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        <ShoppingListItem
          key={item.id}
          item={item}
          listId={listId}
          onClick={() => this.onClickHandler(item)}
        />
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
        <main className="Items">
          <header className="listTitle">
            <h1>{name}</h1>
            {storeBlock}
          </header>
          <section className="shoppingList">
            <div className="item list-heading">Item</div>
            <div className="aisle list-heading">Aisle</div>
            {itemElements}
          </section>
          <AddItem listId={listId} />
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
