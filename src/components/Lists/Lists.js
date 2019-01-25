import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../component.css';
import './Lists.css';

import ShoppingLists from '../shoppingLists';
import NavBar from '../nav-bar';
import CreateShoppingList from '../CreateShoppingList';

import { clearCurrentStore } from '../../actions/yelpAPI';

export class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { addingList: false };
  }

  toggleModal() {
    const addingList = !this.state.addingList;
    this.setState({ addingList });
  }

  closeOut() {
    this.props.dispatch(clearCurrentStore());
  }

  render() {
    let createListModal;
    if (this.state.addingList) {
      createListModal = (
        <div className="CreateShoppingList-container">
          <button
            className="close-button"
            onClick={() => {
              this.toggleModal();
              this.closeOut();
            }}
          >
            Close
          </button>
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
      <button className="add-list-button" onClick={() => this.toggleModal()}>
        Add List
      </button>
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
        {createListModal}
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
