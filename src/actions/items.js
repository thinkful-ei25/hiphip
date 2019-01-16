import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';
export const toggleChecked = itemId => ({
  type: TOGGLE_CHECKED,
  itemId,
});

export const ITEMS_REQUEST = 'ITEMS_REQUEST';
export const itemsRequests = () => ({
  type: ITEMS_REQUEST,
});

export const ITEMS_SUCCESS = 'ITEMS_SUCCESS';
export const itemsSuccess = items => ({
  type: ITEMS_SUCCESS,
  items,
});

export const ITEMS_ERROR = 'ITEMS_ERROR';
export const itemsError = error => ({
  type: ITEMS_ERROR,
  error,
});

export const getItems = listId => (dispatch, getState) => {
  dispatch(itemsRequests());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/items/${listId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(itemsSuccess(res));
    })
    .catch(err => dispatch(itemsError(err)));
};
