import { STORE_API_BASE_URL, API_authToken } from '../config';

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

export const searchStores = searchterm => dispatch => {
  dispatch(searchStoresRequest());
  return fetch(
    `${STORE_API_BASE_URL}?term=${searchterm}&category=grocery&latitude=37.786882&longitude=-122.399972`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${API_authToken}` },
      mode: 'no-cors',
    }
  ).then(res => {
    console.log(res);
  });
};
