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
  changeListName,
} from '../../actions/items';
import NavBar from '../NavBar';
import AddAisle from '../AddAisle';
import { compareAisle, sortAisle, reverseSortAisle } from './utils';

import '../../css/master.css';
import ShoppingListItem from '../ShoppingListItem';

export class Items extends Component {
  onClickHandler(item) {
    const { dispatch, listId, online } = this.props;
    if (!online) {
      return;
    }

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
    const { dispatch, listId, online } = this.props;
    if (online) {
      dispatch(getItems(listId));
    }
  }

  componentDidUpdate(prevProps) {
    const { online, dispatch, listId } = this.props;
    if (!prevProps.online && online) {
      dispatch(getItems(listId));
    }
  }

  editing() {
    const { dispatch, editingName } = this.props;
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
      online,
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
    let itemElements = sortedItems.map((item, index) => {
      return (
        <ShoppingListItem
          key={item.id}
          index={index}
          item={item}
          listId={listId}
          editable={online}
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
    let editForm = (
      <form onSubmit={e => this.newName(e)}>
        <input
          type="text"
          ref={editListName => {
            this.editListName = editListName;
          }}
        />
        <button>
          <img
            className="editIcon"
            src="/edit.png"
            alt="editList"
            type="submit"
          />
        </button>
      </form>
    );
    if (editingName) {
      header = (
        <header className="listTitle">
          <h1>
            {editForm}
            <img
              className="editIconTwo"
              src="/edit2.png"
              alt="editList"
              onClick={() => this.editing()}
            />
          </h1>
          {storeBlock}
        </header>
      );
    } else {
      header = (
        <header className="listTitle">
          <h1>
            {name}
            <img
              className="editIconTwo"
              src="/edit2.png"
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
          {online && <AddItem listId={listId} />}
          {online && aislePrompt ? <AddAisle listId={listId} /> : null}
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
    online: state.connectivity.online,
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
