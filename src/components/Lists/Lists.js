import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ShoppingList from '../ShoppingList';
import NavBar from '../nav-bar';
import CreateShoppingList from '../CreateShoppingList';

import { getLists } from '../../actions/shoppingLists';
import { clearCurrentStore, setUserLocation } from '../../actions/yelpAPI';
import './Lists.css';
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
          <CreateShoppingList />
          <button
            className="close-button"
            onClick={() => {
              this.toggleModal();
              this.closeOut();
            }}
          >
            Close
          </button>
        </div>
      );
    }
    const navBarJSX = <NavBar />;
    const { lists, history } = this.props;
    const shoppingLists = lists.map(list => (
      <ShoppingList
        id={list.id}
        name={list.name}
        groceryStore={list.store}
        editing={list.editing}
        history={history}
      />
    ));
    let createList = (
      <i
        class="orange fas fa-plus-circle fa-5x"
        onClick={() => this.toggleModal()}
      />
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

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    lists: state.lists.lists,
    history: ownProps.history,
  };
};

export default connect(mapStateToProps)(Lists);
