import React from 'react';

import './RegistrationPage.css';
import RegistrationForm from '../RegistrationForm';
import redirectWhenLoggedIn from '../redirectWhenLoggedIn';

export function RegistrationPage(props) {
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

export default redirectWhenLoggedIn('/lists')(RegistrationPage);
