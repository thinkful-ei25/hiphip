import React, { Component } from 'react';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

export class Logout extends Component {
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <h2 className="button logout" onClick={() => this.logout()}>
        Logout
      </h2>
    );
  }
}

export default connect()(Logout);
