import React from 'react';

import LoginForm from '../LoginForm';
import redirectWhenLoggedIn from '../redirectWhenLoggedIn';

import './LoginPage.css';

export function LoginPage(props) {
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

export default redirectWhenLoggedIn('/lists')(LoginPage);
