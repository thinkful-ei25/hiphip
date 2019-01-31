import React, { Fragment } from 'react';

import { addItemToList } from '../../actions/items';
import '../Items/Items.css';
import './AddItem.css';
import { connect } from 'react-redux';

export function AddItem({ listId, dispatch, tempItemId }) {
  function onSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name || tempItemId) {
      return;
    }
    const aisleLocation = e.target.aisle.value;
    e.target.aisle.value = '';
    e.target.name.value = '';
    dispatch(addItemToList({ name, aisleLocation }, listId));
  }
  return (
    <Fragment>
      <div className="ShoppingListItem--editing item">
        <form id="add-item-form" onSubmit={onSubmit} />
        <input
          data-lpignore="true"
          form="add-item-form"
          name="name"
          type="text"
          className="editingItem padded"
          title="Item name"
          aria-label="Item name"
        />
      </div>
      <div className="ShoppingListItem--editing aisle">
        <input
          form="add-item-form"
          name="aisle"
          className="editingAisle padded"
          title="Aisle (optional)"
          aria-label="Aisle (optional)"
        />
      </div>

      <button type="submit" form="add-item-form" className="add-item-btn">
        Add
      </button>
    </Fragment>
  );
}
export default connect()(AddItem);
