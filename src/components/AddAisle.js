import React, { Component } from 'react';
import { connect } from 'react-redux';
import { patchItem, removeAislePrompt } from '../actions/items';
export class AddAisle extends Component {
  updateAisle(e) {
    e.preventDefault();
    const { dispatch, listId, item } = this.props;
    item.aisleLocation = this.input.value;
    this.input.value = '';
    dispatch(patchItem(item, listId));
    dispatch(removeAislePrompt());
  }
  render() {
    const { item } = this.props;
    return (
      <form onSubmit={e => this.updateAisle(e)}>
        <span>You found the {item.name}. Which aisle are you in?</span>
        <input type="text" ref={input => (this.input = input)} />
        <button>Update Aisle</button>
      </form>
    );
  }
}
const mapStateToProps = state => {
  const item = state.items.aislePrompt;
  return {
    item,
  };
};

export default connect(mapStateToProps)(AddAisle);
