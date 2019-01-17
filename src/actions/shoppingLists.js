import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
export const LISTS_REQUEST = 'LISTS_REQUEST';
export const listsRequests = () => ({
  type: LISTS_REQUEST,
});

export const LISTS_SUCCESS = 'LISTS_SUCCESS';
export const listsSuccess = lists => ({
  type: LISTS_SUCCESS,
  lists,
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

export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const createListRequest = () => ({
  type: CREATE_LIST_REQUEST,
});

export const CREATE_LIST_ERROR = 'CREATE_LIST_ERROR';
export const createListError = error => ({
  type: CREATE_LIST_ERROR,
  error,
});

export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const createListSuccess = list => ({
  type: CREATE_LIST_SUCCESS,
  list,
});

export const createList = (name, store, history) => (dispatch, getState) => {
  dispatch(createListRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/lists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, store }),
  })
    .then(normalizeResponseErrors)
    .then(res => res.json())
    .then(res => {
      dispatch(createListSuccess(res.list));
      history.push('/lists');
    })
    .catch(error => dispatch(createListError(error)));
};
