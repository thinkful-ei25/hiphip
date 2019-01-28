import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from './auth-components/logout';
import '../css/master.css';
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
    const NavBar = (
      <div className="navigation">
        {logOutButton}
        {listLink}
      </div>
    );

    return <nav className="nav-container">{NavBar}</nav>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(NavBar);
