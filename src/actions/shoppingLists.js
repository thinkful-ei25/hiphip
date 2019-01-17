import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
export const LISTS_REQUEST = 'LISTS_REQUEST';
export const listsRequests = () => ({
  type: LISTS_REQUEST,
});

export const LISTS_SUCCESS = 'LISTS_SUCCESS';
export const listsSuccess = userLists => ({
  type: LISTS_SUCCESS,
  userLists,
});

export const LISTS_ERROR = 'LISTS_ERROR';
export const listsError = error => ({
  type: LISTS_ERROR,
  error,
});

export const getLists = () => (dispatch, getState) => {
  dispatch(listsRequests());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(listsSuccess(res));
    })
    .catch(err => dispatch(listsError(err)));
};
