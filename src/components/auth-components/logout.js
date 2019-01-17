import React, { Component } from 'react';
import { clearAuth } from '../../actions/auth';
import { connect } from 'react-redux';
import { clearAuthToken } from '../../local-storage';
import './logout.css';
export class Logout extends Component {
  logout() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
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
