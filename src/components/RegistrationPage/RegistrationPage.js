import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './RegistrationPage.css';
import RegistrationForm from '../RegistrationForm';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }

  return (
    <div className="RegistrationPage">
      <header>
        <h1>GoCery</h1>
      </header>
      <main>
        <RegistrationForm />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(RegistrationPage);
