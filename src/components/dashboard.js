import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return <h2>Welcome {this.props.username}</h2>;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
  };
};

export default connect(mapStateToProps)(Dashboard);
