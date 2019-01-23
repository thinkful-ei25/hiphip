import React, { Component } from 'react';
import { connect } from 'react-redux';
import { patchItem, removeAislePrompt } from '../actions/items';
export class AddAisle extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.onClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClick, false);
  }

  onClick = e => {
    const { dispatch } = this.props;
    if (this.addAisleForm.contains(e.target)) {
      return;
    }
    dispatch(removeAislePrompt());
  };
  updateAisle(e) {
    e.preventDefault();
    const { dispatch, listId, item } = this.props;
    item.aisleLocation = this.input.value;
    if (item.aisleLocation) {
      dispatch(
        patchItem({ id: item.id, aisleLocation: item.aisleLocation }, listId)
      );
    }
    dispatch(removeAislePrompt());
  }
  render() {
    const { item } = this.props;
    return (
      <form
        onSubmit={e => this.updateAisle(e)}
        ref={addAisleForm => (this.addAisleForm = addAisleForm)}
      >
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
