import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from './auth-components/logout';
import ConnectivityMessage from './ConnectivityMessage';
import './component.css';

export class NavBar extends React.Component {
  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <LogOut />;
    }
    const listLink = (
      <Link to="/lists">
        <h1>My Lists</h1>
      </Link>
    );

    return (
      <nav className="navigation">
        <ConnectivityMessage />
        {logOutButton}
        {listLink}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(NavBar);
