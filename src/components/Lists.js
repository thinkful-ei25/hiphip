import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import { getLists } from '../actions/shoppingLists';

import './component.css';
import NavBar from './nav-bar';

export class Lists extends Component {
  componentDidMount() {
    this.props.dispatch(getLists());
  }

  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const navBarJSX = <NavBar />;
    const { lists } = this.props.lists;
    const shoppingLists = lists.map(list => (
      <ShoppingList
        id={list.id}
        name={list.name}
        groceryStore={list.store}
        editing={list.editing}
      />
    ));
    const createList = (
      <Link to="/lists/create">
        <img src="/plus.png" alt="addList" />
      </Link>
    );
    const pageWrapped = (
      <div className="pageWrapped">
        <ul className="shoppingLists">{shoppingLists}</ul>
        {createList}
      </div>
    );
    const mainListPage = (
      <div className="wrappedListPage">
        {navBarJSX}
        {pageWrapped}
      </div>
    );
    return <main className="list-page-wrapper">{mainListPage}</main>;
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser && state.auth.currentUser.username,
    lists: state.lists,
  };
};

export default connect(mapStateToProps)(Lists);
