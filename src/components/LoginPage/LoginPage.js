import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import '../auth-components/auth.css';

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's lists
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }
  const logIn = <LoginForm className="wrappedForm" />;

  const logo = <h1 className="logo">GoCery</h1>;
  const wrapped = (
    <div className="login-form">
      {logo}
      {logIn}
    </div>
  );
  return <main className="splash">{wrapped}</main>;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
