import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ErrorBanner.css';

export function ErrorBanner({ children, loggedIn }) {
  return (
    <div className="ErrorBanner">
      {children}
      <Link to={loggedIn ? '/lists' : '/'}>Return home</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(ErrorBanner);
