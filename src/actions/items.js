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

export const SET_LIST_NAME = 'SET_LIST_NAME';
export const setListName = name => ({
  type: SET_LIST_NAME,
  name,
});

export const addItemToList = addedItem => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  // return fetch(`${API_BASE_URL}/api/items/${listId}`);
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
