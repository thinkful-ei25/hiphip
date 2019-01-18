import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getLists } from '../actions/shoppingLists';
import { setListName } from '../actions/items';

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
      return (
        <li key={list.id}>
          <Link
            onClick={() => this.clickedAList(list.name)}
            to={`/lists/${list.id}`}
          >
            Name: {list.name} Address: {list.address}
          </Link>
        </li>
      );
    });

    return <ul>{lists}</ul>;
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
