import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Lists from './dashboard-lists';
export class Dashboard extends Component {
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <h2>Welcome {this.props.username}</h2>
        <Lists />
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
