import React, { Component } from 'react';
import { clearAuth } from '../../actions/auth';
import { connect } from 'react-redux';
import './logout.css';
export class Logout extends Component {
  clickHandler() {
    this.props.dispatch(clearAuth());
  }
  render() {
    return (
      <button className="button logout" onClick={() => this.clickHandler()}>
        Logout
      </button>
    );
  }
}

export default connect()(Logout);
