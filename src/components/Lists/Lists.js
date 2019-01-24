import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../component.css';
import './Lists.css';

import ShoppingList from '../ShoppingList';
import NavBar from '../NavBar';
import CreateShoppingList from '../CreateShoppingList';

import { getLists } from '../../actions/shoppingLists';
import { clearCurrentStore, setUserLocation } from '../../actions/yelpAPI';

export class Lists extends Component {
  componentDidMount() {
    this.props.dispatch(getLists());
    this.props.dispatch(setUserLocation());
  }

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
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
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
    const navBarJSX = <NavBar />;
    const { lists } = this.props;
    const shoppingLists = lists.map(list => (
      <ShoppingList
        id={list.id}
        name={list.name}
        groceryStore={list.store}
        editing={list.editing}
      />
    ));
    let createList = (
      <button className="add-list-button" onClick={() => this.toggleModal()}>
        Add List
      </button>
    );
    if (this.state.addingList) {
      createList = null;
    }
    const pageWrapped = (
      <div className="pageWrapped">
        <ul className="shoppingLists">{shoppingLists}</ul>
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
    lists: state.lists.lists,
  };
};

export default connect(mapStateToProps)(Lists);
