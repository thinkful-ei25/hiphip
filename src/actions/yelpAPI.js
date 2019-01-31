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

export const searchStores = (term, coords) => (dispatch, getState) => {
  dispatch(searchStoresRequest());
  const authToken = getState().auth.authToken;
  const { latitude, longitude } = coords;
  const category = 'grocery';
  return fetch(`${API_BASE_URL}/api/yelp/coords`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ term, latitude, longitude, category }),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ businesses }) => {
      dispatch(searchStoresSuccess(businesses));
    })
    .catch(err => {
      dispatch(searchStoresError(err));
    });
};

export const searchStoresWithLocation = (term, location) => (
  dispatch,
  getState
) => {
  dispatch(searchStoresRequest());
  const category = 'grocery';
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/yelp/location`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ term, location, category }),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ businesses }) => {
      dispatch(searchStoresSuccess(businesses));
    })
    .catch(err => dispatch(searchStoresError(err)));
};

export const SET_CURRENT_STORE = 'SET_CURRENT_STORE';
export const setCurrentStore = store => ({
  type: SET_CURRENT_STORE,
  store,
});

export const CLEAR_CURRENT_STORE = 'CLEAR_CURRENT_STORE';
export const clearCurrentStore = () => ({
  type: CLEAR_CURRENT_STORE,
});

export const CLEAR_STORES = 'CLEAR_STORES';
export const clearStores = () => ({
  type: CLEAR_STORES,
});

export const USER_LOCATION_REQUEST = 'USER_LOCATION_REQUEST';
export const userLocationRequest = () => ({
  type: USER_LOCATION_REQUEST,
});

export const USER_LOCATION_SUCCESS = 'USER_LOCATION_SUCCESS';
export const userLocationSuccess = location => ({
  type: USER_LOCATION_SUCCESS,
  location,
});

export const USER_LOCATION_ERROR = 'USER_LOCATION_ERROR';
export const userLocationError = error => ({
  type: USER_LOCATION_ERROR,
  error,
});

export const setUserLocation = () => (dispatch, getState) => {
  dispatch(userLocationRequest());
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
    .then(pos => {
      const coords = pos.coords;
      dispatch(userLocationSuccess(coords));
      return coords;
    })
    .catch(error => {
      dispatch(userLocationError(error));
    });
};
