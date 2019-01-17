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
export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  error,
});

export const ADD_ITEMS_REQUEST = 'ADD_ITEMS_REQUEST';
export const addItemsRequest = () => ({
  type: ADD_ITEMS_REQUEST,
});

export const ADD_ITEMS_ERROR = 'ADD_ITEMS_ERROR';
export const addItemsError = error => ({
  type: ADD_ITEMS_ERROR,
  error,
});

export const ADD_ITEMS_SUCCESS = 'ADD_ITEMS_SUCCESS';
export const addItemsSuccess = item => ({
  type: ADD_ITEMS_SUCCESS,
  item,
});

export const SET_LIST_NAME = 'SET_LIST_NAME';
export const setListName = name => ({
  type: SET_LIST_NAME,
  name,
});

export const GET_LIST_META_REQUEST = 'GET_LIST_META_REQUEST';
export const getListMetaRequest = () => ({
  type: GET_LIST_META_REQUEST,
});

export const GET_LIST_META_ERROR = 'GET_LIST_META_ERROR';
export const getListMetaError = error => ({
  type: GET_LIST_META_ERROR,
  error,
});

export const GET_LIST_META_SUCCESS = 'GET_LIST_META_SUCCESS';
export const getListMetaSuccess = name => ({
  type: GET_LIST_META_SUCCESS,
  name,
});

export const addItemToList = addedItem => (dispatch, getState) => {
  dispatch(getItemsRequests());
  const authToken = getState().auth.authToken;
  // return fetch(`${API_BASE_URL}/api/items/${listId}`);
};

export const getListName = listId => (dispatch, getState) => {
  dispatch(getListMetaRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists/${listId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      console.log(res.list.name);
      dispatch(getListMetaSuccess(res.list.name));
    })
    .catch(err => dispatch(getListMetaError(err)));
};

export const getItems = listId => (dispatch, getState) => {
  dispatch(getItemsRequests());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/items/${listId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(getItemsSuccess(res.items));
    })
    .catch(err => dispatch(getItemsError(err)));
};
