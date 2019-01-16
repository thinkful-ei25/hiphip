import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from './auth-components/logout';

export class NavBar extends React.Component {
  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <LogOut />;
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
