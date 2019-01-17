import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AddItem from './addItem';
import { getItems, toggleChecked, getListName } from '../actions/items';
import NavBar from './nav-bar';

const strikeThrough = { textDecoration: 'line-through' };
export class List extends Component {
  onClickHandler(itemId) {
    this.props.dispatch(toggleChecked(itemId));
  }
  componentDidMount() {
    this.props.dispatch(getItems(this.props.listId));
    this.props.dispatch(getListName(this.props.listId));
  }
  render() {
    if (this.props.authLoading || this.props.list.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    const items = this.props.list.items.map(item => {
      return (
        <li
          key={item.id}
          style={item.checked ? strikeThrough : null}
          onClick={() => this.onClickHandler(item.id)}
        >
          item: {item.name} aisle: {item.aisle}
        </li>
      );
    });

    return (
      <Fragment>
        <NavBar />
        <h2>{this.props.listName}</h2>
        <h3>{this.props.list.storeAddress}</h3>
        <ul>
          {items}
          <AddItem />
        </ul>
        <Link to="/lists">Lists</Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.match.params;
  console.log(state);
  return {
    listName: state.list.name,
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    authLoading: state.auth.loading,
    list: state.list,
    listId,
  };
};

export default connect(mapStateToProps)(List);
