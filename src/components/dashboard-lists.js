import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class Lists extends Component {
  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const lists = this.props.lists.map((list, idx) => {
      console.log(list);
      return (
        <li key={idx}>
          <a href={`#${list}`}>{list}</a>
        </li>
      );
    });

    return <ul>{lists}</ul>;
  }
}

const mapStateToProps = state => {
  const shoppingLists = ['cakes', 'stew', 'tamales']; //dummy data
  return {
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    lists: shoppingLists,
  };
};

export default connect(mapStateToProps)(Lists);
