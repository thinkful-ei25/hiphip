import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';

import './LoginPage.css';

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's lists
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }

  return (
    <div className="LoginPage">
      <header>
        <h1>GoCery</h1>
      </header>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
