import React, { Component } from 'react';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import '../../css/master.css';
export class Logout extends Component {
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    const { disabled } = this.props;
    return (
      <button
        type="button"
        className="button logout"
        disabled={disabled}
        onClick={() => this.logout()}
      >
        Logout
      </button>
    );
  }
}

const mapStateToProps = state => ({
  disabled: !state.connectivity.online,
});

export default connect(mapStateToProps)(Logout);
