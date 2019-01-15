import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

export function shoppingLists(props) {
  if (!props.username) {
    return <Redirect to="/" />;
  }
  const lists = props.listsNames.map(list => {
    return (
      <li key={list.id}>
        <Link to={`/lists/${list.id}`}>
          Name: {list.name} Address: {list.address}
        </Link>
      </li>
    );
  });

  return <ul>{lists}</ul>;
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    listsNames: state.dashboard ? state.dashboard.lists : null,
  };
};

export default connect(mapStateToProps)(shoppingLists);
