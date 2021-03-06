import {
  SEARCH_STORES_REQUEST,
  SEARCH_STORES_SUCCESS,
  SEARCH_STORES_ERROR,
  SET_CURRENT_STORE,
  CLEAR_CURRENT_STORE,
  CLEAR_STORES,
  USER_LOCATION_ERROR,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS,
} from '../actions/yelpAPI';

const initialState = {
  stores: [],
  loading: false,
  error: null,
  currentStore: null,
  userLocation: null,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_STORES_ERROR:
      return { ...state, loading: false, error: action.error };
    case SEARCH_STORES_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_STORES_SUCCESS:
      return { ...state, loading: false, stores: action.stores };
    case SET_CURRENT_STORE:
      return { ...state, loading: false, currentStore: action.store };
    case CLEAR_CURRENT_STORE:
      return { ...state, currentStore: null };
    case CLEAR_STORES:
      return { ...state, stores: [] };
    case USER_LOCATION_ERROR:
      return {
        ...state,
        userLocation: null,
        error: action.error,
      };
    case USER_LOCATION_REQUEST:
      return {
        ...state,
        error: null,
      };
    case USER_LOCATION_SUCCESS:
      return {
        ...state,
        userLocation: action.location,
      };
    default:
      return state;
  }
}
