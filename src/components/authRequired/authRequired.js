import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';

export default () => Component => {
  function authRequired({ authenticated, error, loading, ...passThrough }) {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!authenticated || error) {
      return <Redirect to="/" />;
    }

    return <Component {...passThrough} />;
  }

  const mapStateToProps = state => ({
    loading: state.auth.loading,
    authenticated: state.auth.currentUser !== null,
    error: state.auth.error,
  });

  return connect(mapStateToProps)(authRequired);
};
