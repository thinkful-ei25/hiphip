import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AddItem from './AddItem';
import { getItems, toggleChecked } from '../actions/items';
import NavBar from './nav-bar';
import './component.css';

const strikeThrough = { textDecoration: 'line-through' };

export class Items extends Component {
  onClickHandler(itemId) {
    const { dispatch, listId } = this.props;
    dispatch(toggleChecked(itemId, listId));
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
    } = this.props;

    if (authLoading || loading) {
      return <div>Loading...</div>;
    }

    if (!username) {
      return <Redirect to="/" />;
    }
    const hr = <hr />;
    const itemElements = items.map(item => {
      return (
        <li
          key={item.id}
          style={item.isChecked ? strikeThrough : null}
          onClick={() => this.onClickHandler(item.id)}
        >
          <div className="item">{item.name}</div>
          <div className="item aisle">
            {item.aisleLocation && item.aisleLocation.aisleNo}
          </div>
          <div>{hr}</div>
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
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.match.params;
  const { items, loading, store, name } = state.items;
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    items,
    loading,
    store,
    name,
    listId,
  };
};

export default connect(mapStateToProps)(Items);
