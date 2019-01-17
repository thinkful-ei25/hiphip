import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getLists } from '../actions/shoppingLists';

export class ShoppingLists extends Component {
  componentDidMount() {
    this.props.dispatch(getLists());
  }
  render() {
    console.log(this.props);
    if (this.props.dashboard.loading || this.props.username.loading) {
      return <div>loading...</div>;
    }
    if (!this.props.username) {
      return <Redirect to="/" />;
    }

    const lists = this.props.dashboard.lists.map(list => {
      return (
        <li key={list.id}>
          <Link to={`/lists/${list.id}`}>
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
    username: state.auth.currentUser,
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps)(ShoppingLists);
