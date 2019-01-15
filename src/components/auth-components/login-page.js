import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }
  return (
    <Fragment>
      <LoginForm />
      <Link to="/register">Register</Link>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
