import React from 'react';
import { connect } from 'react-redux';

export function ConnectivityMessage({ online }) {
  if (online) {
    return null;
  }
  return (
    <div className="ConnectivityMessage">
      Current operating in read-only mode while offline
    </div>
  );
}

const mapStateToProps = state => ({
  online: state.connectivity.online,
});

export default connect(mapStateToProps)(ConnectivityMessage);
