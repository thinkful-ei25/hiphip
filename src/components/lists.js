import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class Lists extends Component {
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const lists = this.props.listsNames.map((list, idx) => {
      return (
        // FIX -> update key with mongoId
        <li>
          <a href={`#${list}`}>{list}</a>
        </li>
      );
    });

    return <ul>{lists}</ul>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    listsNames: state.lists ? state.lists.lists : null,
  };
};

export default connect(mapStateToProps)(Lists);
