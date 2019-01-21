import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAisleData } from '../actions/items';
export class AddAisle extends Component {
  updateAisle(e) {
    e.preventDefault();
    this.props.dispatch(
      updateAisleData(this.props.listId, this.props.itemId, this.input.value)
    );
  }
  render() {
    return (
      <form onSubmit={e => this.updateAisle(e)}>
        <input type="text" ref={input => (this.input = input)} />
        <button>Update Aisle</button>
      </form>
    );
  }
}

export default connect()(AddAisle);
