import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getLists } from '../actions/shoppingLists';
import { setListName } from '../actions/items';
import './component.css';

export class ShoppingLists extends Component {
  componentDidMount() {
    this.props.dispatch(getLists());
  }
  clickedAList(name) {
    this.props.dispatch(setListName(name));
  }
  render() {
    if (this.props.lists.loading || this.props.username.loading) {
      return <div>loading...</div>;
    }
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const lists = this.props.lists.lists.map(list => {
      let store = '';
      return (
        <li key={list.id}>
          <Link
            onClick={() => this.clickedAList(list.name)}
            to={`/lists/${list.id}`}
          >
            <div>{list.name}</div>
            <div>
              {list.store !== null ? list.store.name + ' - ' : store}
              {list.store !== null ? list.store.address.address1 : store}
            </div>
          </Link>
        </li>
      );
    });

    return <ul className="shoppingLists">{lists}</ul>;
  }
}

const mapStateToProps = state => {
  return {
    listName: state.items.name,
    username: state.auth,
    lists: state.lists,
  };
};

export default connect(mapStateToProps)(ShoppingLists);
