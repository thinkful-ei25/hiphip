import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ShoppingLists from './shoppingLists';

import NavBar from './nav-bar';
export class Lists extends Component {
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <NavBar />
        <h2>Welcome {this.props.username}</h2>
        <ShoppingLists />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
  };
};

export default connect(mapStateToProps)(Lists);
