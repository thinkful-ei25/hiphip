import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logout from './auth-components/logout';
import ShoppingLists from './shoppingLists';
import { getLists } from '../actions/shoppingLists';
export class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(getLists());
  }
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <h2>Welcome {this.props.username}</h2>
        <ShoppingLists />
        <Logout />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
  };
};

export default connect(mapStateToProps)(Dashboard);
