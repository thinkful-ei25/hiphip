import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ShoppingLists from './ShoppingLists';

import './component.css';
import NavBar from './nav-bar';

export class Lists extends Component {
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const navBarJSX = <NavBar />;
    const lists = <ShoppingLists />;
    const createList = (
      <Link to="/lists/create">
        <img src="/plus.png" alt="addList" />
      </Link>
    );
    const pageWrapped = (
      <div className="pageWrapped">
        {lists}
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
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
  };
};

export default connect(mapStateToProps)(Lists);
