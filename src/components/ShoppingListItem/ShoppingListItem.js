import classNames from 'classnames';
import React from 'react';

import './ShoppingListItem.css';

export default function ShoppingListItem({ item, onClick }) {
  const { isEditing } = item;
  if (isEditing) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames('ShoppingListItem', {
        'ShoppingListItem--checked': item.isChecked,
      })}
    >
      <div className="name">{item.name}</div>
      <div className="aisle">
        {item.aisleLocation && item.aisleLocation.aisleNo}
      </div>
    </button>
  );
}
