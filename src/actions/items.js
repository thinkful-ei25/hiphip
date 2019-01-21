import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';
export const toggleChecked = itemId => ({
  type: TOGGLE_CHECKED,
  itemId,
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

export const UPDATE_AISLE_DATA_REQUEST = 'UPDATE_AISLE_DATA_REQUEST';
export const updateAisleDataRequest = () => ({
  type: UPDATE_AISLE_DATA_REQUEST,
});

export const UPDATE_AISLE_DATA_ERROR = 'UPDATE_AISLE_DATA_ERROR';
export const updateAisleDataError = err => ({
  type: UPDATE_AISLE_DATA_ERROR,
  err,
});

export const UPDATE_AISLE_DATA_SUCCESS = 'UPDATE_AISLE_DATA_SUCCESS';
export const updateAisleDataSuccess = item => {
  return {
    type: UPDATE_AISLE_DATA_SUCCESS,
    item,
  };
};

export const SET_LIST_NAME = 'SET_LIST_NAME';
export const setListName = name => ({
  type: SET_LIST_NAME,
  name,
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

export const updateAisleData = (listId, itemId, aisle) => (
  dispatch,
  getState
) => {
  dispatch(updateAisleDataRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ aisle }),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ item }) => {
      dispatch(updateAisleDataSuccess(item));
    })
    .catch(err => updateAisleDataError(err));
};
