import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AddItem from '../AddItem';
import ErrorBanner from '../ErrorBanner';

import {
  getItems,
  toggleChecked,
  displayAislePrompt,
  sortItems,
  reverseSortItems,
  unsortItems,
  editListName,
  changeListName,
} from '../../actions/items';

import NavBar from '../nav-bar';
import AddAisle from '../AddAisle';
import LoadingSpinner from '../LoadingSpinner';
import authRequired from '../authRequired';
import { compareAisle, sortAisle } from './utils';

import ShoppingListItem from '../ShoppingListItem';
import './Items.css';
export class Items extends Component {
  onClickHandler(item) {
    const { dispatch, listId } = this.props;
    if (!item.isChecked) {
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
    const { dispatch } = this.props;
    dispatch(editListName());
  }

  newName(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    if (!this.editListName.value.trim()) {
      dispatch(editListName());
      return;
    }
    dispatch(changeListName(this.editListName.value, this.props.listId));
  }

  render() {
    const {
      items,
      listId,
      loading,
      name,
      store,
      aislePrompt,
      editingName,
      error,
    } = this.props;

    if (loading) {
      return (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      if (error.code === 404 || error.code === 422) {
        return <Redirect to="/lists" />;
      }
      return (
        <ErrorBanner>
          <p>An unexpected error occured</p>
        </ErrorBanner>
      );
    }

    let sortedItems = items.slice();
    sortedItems.sort(compareAisle);
    sortedItems.sort(sortAisle);

    let itemElements = sortedItems.map((item, index) => {
      return (
        <ShoppingListItem
          key={item.id}
          index={index}
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
        <h3 className="storeAddress">
          {store.name}

          {address}
        </h3>
      );
    }

    let header;
    let editForm = (
      <form className="listNameForm" onSubmit={e => this.newName(e)}>
        <input
          type="text"
          defaultValue={name}
          ref={editListName => {
            this.editListName = editListName;
          }}
        />
        <button className="editButton" type="submit">
          <i className="fas fa-check-circle" />
        </button>
      </form>
    );

    if (editingName) {
      header = (
        <header className="listTitle">
          {editForm}
          {storeBlock}
        </header>
      );
    } else {
      header = (
        <header className="listTitle">
          <h1>
            {name}
            <button className="editButton" onClick={() => this.editing()}>
              <i className="fas fa-pencil-alt" />
            </button>
          </h1>
          {storeBlock}
        </header>
      );
    }

    return (
      <Fragment>
        <NavBar />
        <main className="mainForItems">
          <div className="Items">
            {header}
            <section className="shoppingList">
              <div />
              <div className="item list-heading">Item</div>
              <div className="aisle aisle-heading list-heading">Aisle</div>
              {itemElements}
              <AddItem listId={listId} />
            </section>
            {aislePrompt ? <AddAisle listId={listId} /> : null}
          </div>
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
    error,
  } = state.items;
  return {
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
    error,
  };
};

export default authRequired()(connect(mapStateToProps)(Items));
