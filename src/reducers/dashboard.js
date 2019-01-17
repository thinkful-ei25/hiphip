import {
  LISTS_REQUEST,
  LISTS_SUCCESS,
  LISTS_ERROR,
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_ERROR,
} from '../actions/shoppingLists';

const initialState = {
  lists: [
    { name: 'Fiesta', address: '2234 42nd St', id: 1 },
    { name: 'Costco', address: '223 82nd St', id: 2 },
    { name: 'C-Town', address: '2 1st Ave', id: 3 },
  ],
  loading: false,
  err: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LISTS_REQUEST:
      return { ...state, loading: true };
    case LISTS_SUCCESS:
      return { ...state, loading: false, lists: action.lists.shoppingLists };
    case LISTS_ERROR:
      return { ...state, loading: false, err: action.error };
    case CREATE_LIST_REQUEST: {
      console.log('request');
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case CREATE_LIST_SUCCESS: {
      const { list } = action;
      return {
        ...state,
        loading: false,
        error: null,
        lists: [...state.lists, list],
      };
    }
    case CREATE_LIST_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
