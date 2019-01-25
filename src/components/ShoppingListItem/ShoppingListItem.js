import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './ShoppingListItem.css';
import {
  toggleEditMode,
  patchItem,
  deleteItem,
  manualSortUp,
  manualSortDown,
} from '../../actions/items';

export function ShoppingListItem({
  item,
  onClick,
  toggleEditMode,
  patchItem,
  deleteItem,
  listId,
  key,
  manualSortUp,
  manualSortDown,
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
        <a
          className="button"
          href="#edit"
          onClick={() => toggleEditMode(item.id)}
        >
          Edit
        </a>
      </div>
      <div>
        <a href="#sorted" onClick={() => manualSortUp(item.id)}>
          U
        </a>

        <a href="#sorted" onClick={() => manualSortDown(item.id)}>
          D
        </a>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = {
  toggleEditMode,
  patchItem,
  deleteItem,
  manualSortUp,
  manualSortDown,
};

export default connect(
  null,
  mapDispatchToProps
)(ShoppingListItem);
