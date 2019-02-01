import React, { Component } from 'react';
import { connect } from 'react-redux';
import { patchItem, removeAislePrompt } from '../../actions/items';
import './AddAisle.css';
export class AddAisle extends Component {
  removeDefaultVal = e => {
    e.target.value = '';
  };
  onClick = e => {
    const { dispatch } = this.props;
    if (
      this.addAisleForm.contains(e.target) &&
      e.target.id !== 'close-aisle-prompt'
    ) {
      return;
    }
    e.stopPropagation();
    dispatch(removeAislePrompt());
  };
  updateAisle(e) {
    e.preventDefault();
    const { dispatch, listId, item } = this.props;
    const aisleLocation = item.aisleLocation;
    aisleLocation.aisleNo = this.input.value;
    if (item.aisleLocation.aisleNo) {
      dispatch(patchItem(item, { id: item.id, aisleLocation }, listId));
    }
    dispatch(removeAislePrompt());
  }
  render() {
    const { aisleLocation } = this.props.item;
    return (
      <div className="aisle-prompt-container" onClick={e => this.onClick(e)}>
        <form
          onSubmit={e => this.updateAisle(e)}
          ref={addAisleForm => (this.addAisleForm = addAisleForm)}
          data-lpignore="true"
          className="aisle-prompt"
        >
          <span id="close-aisle-prompt" className="fas fa-times" />
          <div className="aisle-prompt-form">
            <label htmlFor="aisle-prompt">Which aisle are you in?</label>
          </div>
          <div className="aisle-prompt-form input-aisle">
            <input
              id="aisle-prompt"
              onFocus={this.removeDefaultVal}
              type="text"
              defaultValue={aisleLocation && aisleLocation.aisleNo}
              ref={input => (this.input = input)}
            />
          </div>
          <div className="aisle-prompt-form">
            <button className="button">Update Aisle</button>
          </div>
        </form>
      </div>
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
