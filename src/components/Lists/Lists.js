import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ShoppingLists from '../shoppingLists';

import '../component.css';
import './Lists.css';

import NavBar from '../nav-bar';
import CreateShoppingList from '../CreateShoppingList';

export class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { addingList: false };
  }

  render() {
    let CreateListModal = <div className="empty-div">I'm here</div>;
    if (this.state.addingList) {
      CreateListModal = (
        <div>
          <CreateShoppingList />
        </div>
      );
    }

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
        {CreateListModal}
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
