import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuthToken } from '../local-storage';
import { clearAuth } from '../actions/auth';

export class NavBar extends React.Component {
  logOut() {
    console.log('Logging out');

    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button
          onClick={() => {
            this.logOut();
          }}
        >
          Log out
        </button>
      );
    }

    const NavBar = (
      <div className="nav-container">
        <nav>
          <Link to="/lists">My Lists</Link>
          {logOutButton}
        </nav>
      </div>
    );

    return <main>{NavBar}</main>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(NavBar);
