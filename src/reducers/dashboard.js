import {
  LISTS_REQUEST,
  LISTS_SUCCESS,
  LISTS_ERROR,
} from '../actions/shoppingLists';

const initialState = {
  lists: [],
  loading: false,
  err: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LISTS_REQUEST:
      return { ...state, loading: true };
    case LISTS_SUCCESS:
      return { ...state, loading: false, lists: action.userLists.lists };
    case LISTS_ERROR:
      return { ...state, loading: false, err: action.error };
    default:
      return state;
  }
}
