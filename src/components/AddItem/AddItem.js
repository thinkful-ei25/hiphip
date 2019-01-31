import React, { Fragment } from 'react';

import { addItemToList } from '../../actions/items';
import '../Items/Items.css';
import './AddItem.css';
import { connect } from 'react-redux';

export function AddItem({ listId, dispatch }) {
  function onSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name) {
      return;
    }
    const aisleLocation = e.target.aisle.value;
    dispatch(addItemToList({ name, aisleLocation }, listId));
  }
  return (
    <Fragment>
      <div className="ShoppingListItem--editing item">
        <form id="add-item-form" onSubmit={onSubmit} />
        <input
          form="add-item-form"
          name="name"
          type="text"
          className="editingItem padded"
        />
      </div>
      <div className="ShoppingListItem--editing aisle">
        <input
          form="add-item-form"
          name="aisle"
          className="editingAisle padded"
        />
      </div>

      <button type="submit" form="add-item-form" className="add-item-btn">
        Add
      </button>
    </Fragment>
  );
}
export default connect()(AddItem);
