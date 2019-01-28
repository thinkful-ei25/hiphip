import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  toggleEditMode,
  patchItem,
  deleteItem,
  reorder,
} from '../../actions/items';
import '../Items/Items.css';
import '../Lists/Lists.css';
export function ShoppingListItem({
  item,
  onClick,
  toggleEditMode,
  patchItem,
  deleteItem,
  listId,
  reorder,
  index,
  key,
}) {
  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    const name = e.target.name.value;
    const aisleLocation = e.target.aisle.value;
    toggleEditMode(item.id);
    patchItem({ id: item.id, name, aisleLocation }, listId);
  }

  const { isEditing } = item;
  if (isEditing) {
    const formId = `edit-item-form-${item.id}`;

    return (
      <Fragment>
        <div className="ShoppingListItem--editing item">
          <form id={formId} onSubmit={handleSubmit} />
          <input
            form={formId}
            name="name"
            defaultValue={item.name}
            type="text"
            className="editingItem padded"
          />
        </div>
        <div className="ShoppingListItem--editing aisle">
          <input
            form={formId}
            name="aisle"
            defaultValue={item.aisleLocation && item.aisleLocation.aisleNo}
            className="editingAisle padded"
          />
        </div>
        <div className="ShoppingListItem-buttons">
          <i
            className="fas fa-check-circle fa-1x"
            type="submit"
            form={formId}
          />

          <i
            className="fas fa-trash-alt fa-1x"
            onClick={() => deleteItem(item.id, listId)}
          />

          <i
            className="fas fa-ban fa-1x"
            onClick={() => toggleEditMode(item.id)}
          />
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <button
        className={classNames(
          'ShoppingListItem',
          { 'ShoppingListItem--checked': item.isChecked },
          'item',
          'padded'
        )}
        type="button"
        onClick={onClick}
      >
        {item.name}
      </button>
      <button
        className={classNames(
          'ShoppingListItem',
          { 'ShoppingListItem--checked': item.isChecked },
          'aisle',
          'padded'
        )}
        onClick={onClick}
        type="button"
      >
        {item.aisleLocation && item.aisleLocation.aisleNo}
      </button>
      <div className="ShoppingListItem-buttons">
        <div>
          <i
            class="fas fa-arrow-up"
            onClick={() => reorder(index, listId, 'up')}
          />

          <i
            class="fas fa-arrow-down"
            onClick={() => reorder(index, listId, 'down')}
          />
        </div>
        <a href="#edit" onClick={() => toggleEditMode(item.id)}>
          <i className="fas fa-edit editIcon" type="submit" />
        </a>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = {
  toggleEditMode,
  patchItem,
  deleteItem,
  reorder,
};

export default connect(
  null,
  mapDispatchToProps
)(ShoppingListItem);
