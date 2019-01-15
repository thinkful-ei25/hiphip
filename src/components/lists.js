import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export function Lists(props) {
  if (!props.username) {
    return <Redirect to="/" />;
  }
  const lists = props.listsNames.map((list, idx) => {
    return (
      // FIX -> update key with mongoId
      <li>
        <a href={`#${list}`}>{list}</a>
      </li>
    );
  });

  return <ul>{lists}</ul>;
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    listsNames: state.lists ? state.lists.lists : null,
  };
};

export default connect(mapStateToProps)(Lists);
