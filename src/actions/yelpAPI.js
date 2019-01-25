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
  const { latitude, longitude } = coords;
  return fetch(
    `${API_BASE_URL}/api/yelp/coords?term=${searchterm}&category=grocery&latitude=${latitude}&longitude=${longitude}`,
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
    .catch(err => dispatch(searchStoresError(err)));
};

export const searchStoresWithLocation = (searchterm, location) => (
  dispatch,
  getState
) => {
  dispatch(searchStoresRequest());
  const authToken = getState().auth.authToken;
  return fetch(
    `${API_BASE_URL}/api/yelp/location?term=${searchterm}&category=grocery&location=${location}`,
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
      console.log(coords);
      dispatch(userLocationSuccess(coords));
      return dispatch(searchStores('grocery store', coords));
    })
    .catch(error => {
      dispatch(userLocationError(error));
    });
};
