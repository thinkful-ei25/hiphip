import classNames from 'classnames';
import React, { Fragment } from 'react';

import './ShoppingListItem.css';

export default function ShoppingListItem({ item, onClick }) {
  const { isEditing } = item;
  if (isEditing) {
    return null;
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
        <button type="button">Edit</button>
      </div>
    </Fragment>
  );
}
