import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';
import './registration.css';
export function RegistrationPage(props) {
  const regForm = <RegistrationForm className="wrappedForm" />;
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's lists
  const regTitle = <h1 className="title">Register for Gocery!</h1>;
  const wrapIt = (
    <div className="wrappedReg">
      {regTitle}
      {regForm}
    </div>
  );
  if (props.loggedIn) {
    return <Redirect to="/lists" />;
  }
  return <main className="registrationPage">{wrapIt}</main>;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(RegistrationPage);
