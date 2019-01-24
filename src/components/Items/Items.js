import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AddItem from '../AddItem';
import {
  getItems,
  toggleChecked,
  displayAislePrompt,
  sortItems,
  reverseSortItems,
  unsortItems,
  editListName,
} from '../../actions/items';
import NavBar from '../nav-bar';
import AddAisle from '../AddAisle';
import { compareAisle, sortAisle, reverseSortAisle } from './utils';

import '../component.css';
import ShoppingListItem from '../ShoppingListItem';

export class Items extends Component {
  onClickHandler(item) {
    const { dispatch, listId } = this.props;
    if (!item.isChecked && item.aisleLocation && !item.aisleLocation.aisleNo) {
      dispatch(displayAislePrompt(item));
    }
    dispatch(toggleChecked(item.id, listId));
  }
  onSort() {
    const { dispatch, sorted, reverseSorted } = this.props;
    if (sorted) {
      dispatch(reverseSortItems());
    } else if (reverseSorted) {
      dispatch(unsortItems());
    } else {
      dispatch(sortItems());
    }
    this.forceUpdate();
  }
  componentDidMount() {
    const { dispatch, listId } = this.props;
    dispatch(getItems(listId));
  }

  editing() {
    const { dispatch, editingName } = this.props;
    dispatch(editListName());
    console.log(editingName);
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
      sorted,
      reverseSorted,
      editingName,
    } = this.props;

    if (authLoading || loading) {
      return <div>Loading...</div>;
    }

    if (!username) {
      return <Redirect to="/" />;
    }
    let sortedItems = items.slice();
    if (sorted) {
      sortedItems.sort(compareAisle);
      sortedItems.sort(sortAisle);
    } else if (reverseSorted) {
      sortedItems.sort(compareAisle);
      sortedItems.sort(reverseSortAisle);
    }
    let itemElements = sortedItems.map(item => {
      return (
        <ShoppingListItem
          key={item.id}
          item={item}
          listId={listId}
          onClick={() => this.onClickHandler(item)}
        />
      );
    });

    let storeBlock, address;
    if (store && store.address) {
      let location = store.address;
      let addressStr = '';
      for (let i = 0; i < location.display_address.length; i++) {
        addressStr += location.display_address[i] + ' ';
      }
      address = <address>{addressStr}</address>;
      storeBlock = (
        <h3>
          {store.name}

          {address}
        </h3>
      );
    }
    let header;
    if (editingName) {
      header = (
        <div>
          {' '}
          <img
            className="editIcon"
            src="/edit.png"
            alt="editList"
            onClick={() => this.editing()}
          />
        </div>
      );
    } else {
      header = (
        <header className="listTitle">
          <h1>
            {name}
            <img
              className="editIcon"
              src="/edit.png"
              alt="editList"
              onClick={() => this.editing()}
            />
          </h1>
          {storeBlock}
        </header>
      );
    }
    return (
      <Fragment>
        <NavBar />
        <main className="Items">
          {header}
          <section className="shoppingList">
            <div className="item list-heading">Item</div>
            <div className="aisle list-heading" onClick={() => this.onSort()}>
              Aisle
            </div>
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
  const {
    items,
    loading,
    store,
    name,
    aislePrompt,
    sorted,
    reverseSorted,
    unsort,
    editingName,
  } = state.items;
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    items,
    loading,
    store,
    name,
    listId,
    aislePrompt,
    sorted,
    reverseSorted,
    unsort,
    editingName,
  };
};

export default connect(mapStateToProps)(Items);
