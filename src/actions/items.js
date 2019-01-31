import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const PATCH_ITEM_REQUEST = 'PATCH_ITEM_REQUEST';
export const patchItemRequest = item => ({
  type: PATCH_ITEM_REQUEST,
  item,
});

export const PATCH_ITEM_SUCCESS = 'PATCH_ITEM_SUCCESS';
export const patchItemSuccess = item => ({
  type: PATCH_ITEM_SUCCESS,
  item,
});

export const PATCH_ITEM_ERROR = 'PATCH_ITEM_ERROR';
export const patchItemError = (itemId, error) => ({
  type: PATCH_ITEM_ERROR,
  itemId,
  error,
});

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const getItemsRequests = () => ({
  type: GET_ITEMS_REQUEST,
});

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const getItemsSuccess = shoppingList => ({
  type: GET_ITEMS_SUCCESS,
  shoppingList,
});

export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  error,
});

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST,
});

export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR';
export const addItemError = error => ({
  type: ADD_ITEM_ERROR,
  error,
});

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  item,
});

export const ADD_AISLE_PROMPT = 'ADD_AISLE_PROMPT';
export const displayAislePrompt = item => ({
  type: ADD_AISLE_PROMPT,
  item,
});
export const REMOVE_AISLE_PROMPT = 'ADD_AISLE_PROMPT';
export const removeAislePrompt = () => ({
  type: ADD_AISLE_PROMPT,
});

export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
export const toggleEditMode = id => ({
  type: TOGGLE_EDIT_MODE,
  id,
});

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const deleteItemRequest = id => ({
  type: DELETE_ITEM_REQUEST,
  id,
});

export const CHANGE_LIST_NAME_REQUEST = 'CHANGE_LIST_NAME_REQUEST';
export const changeListNameRequest = () => ({
  type: CHANGE_LIST_NAME_REQUEST,
});

export const CHANGE_LIST_NAME_SUCCESS = 'CHANGE_LIST_NAME_SUCCESS';
export const changeListNameSuccess = (name, listId) => ({
  type: CHANGE_LIST_NAME_SUCCESS,
  name,
  listId,
});

export const CHANGE_LIST_NAME_ERROR = 'CHANGE_LIST_NAME_ERROR';
export const changeListNameError = (listId, error) => ({
  type: CHANGE_LIST_NAME_ERROR,
  listId,
  error,
});

export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const deleteItemError = (id, error) => ({
  type: DELETE_ITEM_ERROR,
  id,
});

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const deleteItemSuccess = items => ({
  type: DELETE_ITEM_SUCCESS,
  items,
});
export const SORT_ITEMS = 'SORT_ITEMS';
export const sortItems = () => ({
  type: SORT_ITEMS,
});
export const REVERSE_SORT_ITEMS = 'REVERSE_SORT_ITEMS ';
export const reverseSortItems = () => ({
  type: REVERSE_SORT_ITEMS,
});
export const UNSORT_ITEMS = 'UNSORT_ITEMS ';
export const unsortItems = () => ({
  type: UNSORT_ITEMS,
});
export const REORDER_REQUEST = 'REORDER_REQUEST';
export const reorderRequest = index => ({
  type: REORDER_REQUEST,
  index,
});
export const REORDER_ERROR = 'REORDER_ERROR';
export const reorderError = (itemId, err) => ({
  type: REORDER_ERROR,
  itemId,
  err,
});
export const REORDER_SUCCESS = 'REORDER';
export const reorderSuccess = items => ({
  type: REORDER_SUCCESS,
  items,
});

export const EDIT_LIST_NAME = 'EDIT_LIST_NAME';
export const editListName = () => ({
  type: EDIT_LIST_NAME,
});

export const addItemToList = (item, listId) => (dispatch, getState) => {
  dispatch(addItemRequest());

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}/items/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ item }) => {
      dispatch(addItemSuccess(item));
    })
    .catch(error => dispatch(addItemError(error)));
};

export const getItems = listId => (dispatch, getState) => {
  dispatch(getItemsRequests());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ list }) => {
      dispatch(getItemsSuccess(list));
    })
    .catch(err => dispatch(getItemsError(err)));
};

export const patchItem = (item, listId) => (dispatch, getState) => {
  const { id: itemId } = item;
  dispatch(patchItemRequest(item));

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(item),
  })
    .then(normalizeResponseErrors)
    .then(res => res.json())
    .then(({ item: newItem }) => {
      dispatch(patchItemSuccess(newItem));
    })
    .catch(err => dispatch(patchItemError(itemId, err)));
};

export const changeListName = (name, listId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ name }),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(changeListNameSuccess(name)))
    .catch(err => dispatch(changeListNameError(listId, err)));
};

export const toggleChecked = (itemId, listId) => (dispatch, getState) => {
  const item = getState().items.items.find(i => i.id === itemId);
  return dispatch(
    patchItem({ id: itemId, isChecked: !item.isChecked }, listId)
  );
};

export const deleteItem = (itemId, listId) => (dispatch, getState) => {
  dispatch(deleteItemRequest(itemId));
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    method: 'DELETE',
  })
    .then(normalizeResponseErrors)
    .then(res => res.json())
    .then(({ items }) => dispatch(deleteItemSuccess(items)))
    .catch(error => dispatch(deleteItemError(itemId, error)));
};

export const reorder = (index, listId, direction) => (dispatch, getState) => {
  dispatch(reorderRequest());

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}/items/`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ index, direction }),
    method: 'PATCH',
  })
    .then(normalizeResponseErrors)
    .then(res => res.json())
    .then(({ items }) => {
      dispatch(reorderSuccess(items));
    })
    .catch(error => dispatch(reorderError(error)));
};
