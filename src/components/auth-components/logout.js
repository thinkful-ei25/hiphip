import React, { Component } from 'react';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

export class Logout extends Component {
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <button className="button logout" onClick={() => this.logout()}>
        Logout
      </button>
    );
  }
}

export default connect()(Logout);
