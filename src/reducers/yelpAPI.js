import {
  SEARCH_STORES_REQUEST,
  SEARCH_STORES_SUCCESS,
  SEARCH_STORES_ERROR,
  SET_CURRENT_STORE,
} from '../actions/yelpAPI';

const initialState = {
  stores: [],
  loading: false,
  error: null,
  currentStore: null,
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
    default:
      return state;
  }
}
