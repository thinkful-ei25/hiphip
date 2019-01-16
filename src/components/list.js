import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import NavBar from './nav-bar';

function handleClick(event) {
  return {};
}
const strikeThrough = { textDecoration: 'line-through' };
export function List(props) {
  if (props.authLoading) {
    return <div>Logging In...</div>;
  }
  if (!props.username) {
    return <Redirect to="/" />;
  }
  const items = props.list.items.map(item => {
    return (
      <li
        key={item.id}
        onClick={e => handleClick(e)}
        style={item.checked ? strikeThrough : null}
      >
        item: {item.name} aisle: {item.aisle}
      </li>
    );
  });

  return (
    <Fragment>
      <NavBar />
      <ul>
        <h2>{props.list.name} List</h2>
        <h3>{props.list.storeAddress}</h3>
        {items}
      </ul>
      <Link to="/lists">Lists</Link>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    list: state.list,
  };
};

export default connect(mapStateToProps)(List);
