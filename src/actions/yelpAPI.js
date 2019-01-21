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

export const searchStores = searchterm => (dispatch, getState) => {
  dispatch(searchStoresRequest());
  const authToken = getState().auth.authToken;
  return fetch(
    `${API_BASE_URL}/api/yelp?term=${searchterm}&category=grocery&latitude=37.786882&longitude=-122.399972`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    }
  )
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ businesses }) => {
      console.log(businesses);
      dispatch(searchStoresSuccess(businesses));
    });
};
