import React, { Component } from 'react';
import { connect } from 'react-redux';

import authRequired from '../authRequired';
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
    let createListModal;
    if (this.state.addingList) {
      createListModal = (
        <div className="CreateShoppingList-container">
          <i
            className="fas fa-times fa-2x close-button"
            onClick={() => {
              this.toggleModal();
              this.closeOut();
            }}
          />
          <CreateShoppingList />
        </div>
      );
    }

    const navBarJSX = <NavBar />;
    const { lists, history } = this.props;
    const shoppingLists = lists.map(list => (
      <ShoppingList
        id={list.id}
        key={list.id}
        name={list.name}
        groceryStore={list.store}
        editing={list.editing}
        history={history}
      />
    ));

    let createListButton = (
      <button className="add-list-clicker" onClick={() => this.toggleModal()}>
        <i className="fas fa-plus-circle fa-3x" />
      </button>
    );

    const onBoardingPrompt = (
      <div className="onboarding">
        <h2>Create a new shopping list</h2>
      </div>
    );

    if (this.state.addingList) {
      createListButton = null;
    }

    const pageWrapped = (
      <div className="pageWrapped">
        <ul className="shoppingLists">{shoppingLists}</ul>
        {onBoardingPrompt}
        {createListButton}
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
    lists: state.lists.lists,
    history: ownProps.history,
  };
};

export default authRequired()(connect(mapStateToProps)(Lists));
