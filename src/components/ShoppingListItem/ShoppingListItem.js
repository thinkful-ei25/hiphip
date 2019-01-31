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
  delItemReq,
  allowAisleEdit,
  patchItemReq,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (patchItemReq) {
      return;
    }
    const name = e.target.name.value;
    const aisleLocation = item.aisleLocation;
    aisleLocation.aisleNo = e.target.aisle.value;
    toggleEditMode(item.id);
    patchItem(item, { id: item.id, name, aisleLocation }, listId);
  }
  const deleteItemOnClick = () => {
    if (delItemReq) {
      return;
    }
    deleteItem(item.id, listId);
  };
  const checkBox = (
    <button
      className={classNames(
        { 'far fa-square': !item.isChecked },
        { 'far fa-check-square': item.isChecked },
        'padded',
        'check-box',
        'icon-btn'
      )}
      type="button"
      onClick={onClick}
      aria-label="Check off item"
    />
  );
  const { isEditing } = item;
  if (isEditing) {
    const formId = `edit-item-form-${item.id}`;

    return (
      <Fragment>
        {checkBox}
        <div className="ShoppingListItem--editing item">
          <form id={formId} onSubmit={handleSubmit} />
          <input
            form={formId}
            name="name"
            defaultValue={item.name}
            type="text"
            className="editingItem padded"
            data-lpignore="true"
            aria-label="Item name"
          />
        </div>
        <div
          className={classNames('ShoppingListItem--editing', 'aisle', {
            'ShoppingListItem--disabled': !allowAisleEdit,
          })}
        >
          <input
            form={formId}
            name="aisle"
            defaultValue={item.aisleLocation && item.aisleLocation.aisleNo}
            className="editingAisle padded"
            data-lpignore="true"
            aria-label="Aisle"
            disabled={!allowAisleEdit}
          />
        </div>

        <button
          type="submit"
          form={formId}
          className="save-edit editItemButton ShoppingListItem-buttons icon-btn"
          aria-label="Save changes"
        >
          <i className="fas fa-check-circle fa-1x" aria-hidden />
        </button>

        <button
          className="cancel-edit ShoppingListItem-buttons icon-btn"
          onClick={() => toggleEditMode(item.id)}
          aria-label="Cancel"
        >
          <i className="fas fa-ban fa-1x fa-1x" aria-hidden />
        </button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {checkBox}
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
          'aisle',
          'padded',
          'itemInList'
        )}
        onClick={() => toggleEditMode(item.id)}
        type="button"
        aria-label="Edit aisle information"
      >
        {item.aisleLocation && item.aisleLocation.aisleNo}
      </button>
      <a
        href="#edit"
        className="edit-btn icon-btn"
        onClick={() => toggleEditMode(item.id)}
        title="Edit item"
      >
        <i className="fas fa-pencil-alt" aria-hidden />
      </a>
      <button
        className="delete-btn fas fa-times"
        onClick={deleteItemOnClick}
        title="Delete item"
      />
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
