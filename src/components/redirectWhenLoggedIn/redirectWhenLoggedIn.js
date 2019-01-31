import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default href => Component => {
  function redirectWhenLoggedIn({ authenticated, ...passThrough }) {
    if (authenticated) {
      return <Redirect to={href} />;
    }

    return <Component {...passThrough} />;
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.currentUser !== null,
  });

  return connect(mapStateToProps)(redirectWhenLoggedIn);
};
