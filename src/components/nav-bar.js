import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from './logout';
import './navbar.css';
export class NavBar extends React.Component {
  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <LogOut className="rightNav" />;
    }
    const listLink = (
      <Link to="/lists" className="leftNav">
        <h1>My Lists</h1>
      </Link>
    );
    const NavBar = (
      <ul className="navUl">
        <li>{listLink}</li>
        <li>{logOutButton}</li>
      </ul>
    );

    return <nav className="navbar">{NavBar}</nav>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(NavBar);
