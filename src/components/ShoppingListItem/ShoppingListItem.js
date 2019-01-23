import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './ShoppingListItem.css';
import { toggleEditMode, patchItem } from '../../actions/items';

export function ShoppingListItem({
  item,
  onClick,
  toggleEditMode,
  patchItem,
  listId,
}) {
  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    const name = e.target.name.value;
    const aisleLocation = e.target.aisle.value;
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
          <button type="submit" form={formId}>
            Submit
          </button>
          <button type="button">Delete</button>
          <button type="button" onClick={() => toggleEditMode(item.id)}>
            Cancel
          </button>
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
        <button type="button" onClick={() => toggleEditMode(item.id)}>
          Edit
        </button>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = {
  toggleEditMode,
  patchItem,
};

export default connect(
  null,
  mapDispatchToProps
)(ShoppingListItem);
