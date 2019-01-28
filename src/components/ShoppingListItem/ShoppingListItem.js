import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  toggleEditMode,
  patchItem,
  deleteItem,
  reorder,
} from '../../actions/items';

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
          <input form={formId} name="name" defaultValue={item.name} />
        </div>
        <div className="ShoppingListItem--editing aisle">
          <input
            form={formId}
            name="aisle"
            defaultValue={item.aisleLocation && item.aisleLocation.aisleNo}
          />
        </div>
        <div className="ShoppingListItem-buttons">
          <button type="submit" form={formId} className="button">
            Submit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => deleteItem(item.id, listId)}
          >
            Delete
          </button>
          <a
            href="# "
            onClick={() => toggleEditMode(item.id)}
            className="button"
          >
            Cancel
          </a>
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
          'item'
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
          'aisle'
        )}
        onClick={onClick}
        type="button"
      >
        {item.aisleLocation && item.aisleLocation.aisleNo}
      </button>
      <div className="ShoppingListItem-buttons">
        <a href="#edit" onClick={() => toggleEditMode(item.id)}>
          <i className="fas fa-edit" type="submit" />
        </a>
      </div>
      <div>
        <button onClick={() => reorder(index, listId, 'up')}>U</button>

        <button onClick={() => reorder(index, listId, 'down')}>D</button>
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
