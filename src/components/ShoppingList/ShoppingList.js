import React from 'react';
import { Link } from 'react-router-dom';
import '../component.css';

export default function ShoppingList({ id, name, store, editing }) {
  if (editing) {
    return (
      <li key={id}>
        <form id={id} />
        <input name="name" defaultValue={name} />
        {store ? <input name="store" defaultValue={store.name} /> : null}
        <button>delete</button>
      </li>
    );
  }

  return (
    <li key={id}>
      <Link to={`/lists/${id}`}>
        <div>{name}</div>
        <div>
          {store !== null ? store.name + ' - ' : store}
          {store !== null ? store.address.address1 : store}
        </div>
      </Link>
    </li>
  );
}
