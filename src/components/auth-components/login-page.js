import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import LoginForm from './login-form';
import './login.css';

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's lists
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }
  const about = (
    <Link className="about-click" to="/about">
      About
    </Link>
  );
  const logIn = <LoginForm className="wrappedForm" />;

  const logo = <h1 className="logo">GoCery</h1>;
  const wrapped = (
    <div className="login-form">
      {logo}
      {logIn}
    </div>
  );
  return (
    <main className="splash">
      {about}
      {wrapped}
    </main>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
