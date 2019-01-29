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
    if (this.props.lists.length === 0) {
      this.setState({ onboardingUser: true });
    }
  }

  constructor(props) {
    super(props);
    this.state = { addingList: false, onboardingUser: false };
  }

  toggleModal() {
    const addingList = !this.state.addingList;
    this.setState({ addingList, onboardingUser: false });
  }

  toggleOnboarding() {
    this.setState({ onboardingUser: false });
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
    const { onboardingUser } = this.state;
    let onboardingBubble;
    if (onboardingUser) {
      onboardingBubble = (
        <div className="">
          <button onClick={() => this.toggleOnboarding()}>X</button>
          <i className="fas fa-arrow-up" />
          <span>Click here to add a new list.</span>
        </div>
      );
    }
    const shoppingLists = lists.map(list => (
      <ShoppingList
        id={list.id}
        name={list.name}
        groceryStore={list.store}
        editing={list.editing}
      />
    ));
    let createList = (
      <i
        className="orange fas fa-plus-circle fa-5x"
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
        {onboardingBubble}
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
