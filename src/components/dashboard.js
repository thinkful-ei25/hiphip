import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ShoppingLists from './shoppingLists';
import { getLists } from '../actions/shoppingLists';
import NavBar from './nav-bar';
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

export default connect(mapStateToProps)(Dashboard);
