import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SEARCH_STORES_REQUEST = 'SEARCH_STORES_REQUEST';
export const searchStoresRequest = () => ({
  type: SEARCH_STORES_REQUEST,
});

export const SEARCH_STORES_SUCCESS = 'SEARCH_STORES_SUCCESS';
export const searchStoresSuccess = stores => ({
  type: SEARCH_STORES_SUCCESS,
  stores,
});

export const SEARCH_STORES_ERROR = 'SEARCH_STORES_ERROR';
export const searchStoresError = error => ({
  type: SEARCH_STORES_ERROR,
  error,
});

export const searchStores = (searchterm, coords) => (dispatch, getState) => {
  dispatch(searchStoresRequest());
  const authToken = getState().auth.authToken;
  // if (!coords) {
  //   return 'User must share location to find nearby stores';
  // }
  const { latitude, longitude } = coords;
  return fetch(
    `${API_BASE_URL}/api/yelp?term=${searchterm}&category=grocery&latitude=${latitude}&longitude=${longitude}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    }
  )
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ businesses }) => {
      dispatch(searchStoresSuccess(businesses));
    })
    .catch(err => dispatch(searchStoresError));
};
