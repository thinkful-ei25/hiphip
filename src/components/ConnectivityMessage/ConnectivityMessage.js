import React from 'react';
import { connect } from 'react-redux';

import { setOnlineStatus as setOnlineStatusAction } from '../../actions/connectivity';

export class ConnectivityMessage extends React.Component {
  constructor(props) {
    super(props);

    // In order to be able to deregister the event listeners, we cannot use
    // lambda/arrow functions. Thus, we must bind `this` in advance.
    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);
  }

  handleOnline() {
    const { setOnlineStatus } = this.props;
    setOnlineStatus(true);
  }

  handleOffline() {
    const { setOnlineStatus } = this.props;
    setOnlineStatus(false);
  }

  componentDidMount() {
    const { setOnlineStatus } = this.props;

    setOnlineStatus(window.navigator.onLine);
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  render() {
    const { online } = this.props;
    if (online) {
      return null;
    }
    return (
      <div className="ConnectivityMessage">
        Current operating in read-only mode while offline
      </div>
    );
  }
}

const mapStateToProps = state => ({
  online: state.connectivity.online,
});

const mapDispatchToProps = {
  setOnlineStatus: setOnlineStatusAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectivityMessage);
