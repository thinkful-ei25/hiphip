import {
  TOGGLE_CHECKED,
  ADD_ITEMS_REQUEST,
  ADD_ITEMS_ERROR,
  ADD_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
  SET_LIST_NAME,
  GET_LIST_META_REQUEST,
  GET_LIST_META_SUCCESS,
  GET_LIST_META_ERROR,
} from '../actions/items';
const initialState = {
  id: null,
  name: null,
  store: {},
  items: [],
  loading: false,
  error: false,
};

export default function reducer(state = initialState, action) {
  let newItems = [];
  switch (action.type) {
    case TOGGLE_CHECKED:
      const toggledItems = state.items.map(item => {
        if (item.id === action.itemId) {
          item.checked = !item.checked;
        }
        return item;
      });
      return { ...state, toggledItems };
    case GET_ITEMS_REQUEST:
      return { ...state, loading: true };
    case GET_ITEMS_ERROR:
      return { ...state, loading: false, error: true };
    case GET_ITEMS_SUCCESS:
      for (let i = 0; i < action.items.length; i++) {
        newItems.push(action.items[i]);
      }
      return { ...state, loading: false, items: newItems };
    case ADD_ITEMS_REQUEST:
      return { ...state, loading: true };
    case ADD_ITEMS_ERROR:
      return { ...state, error: action.error };
    case ADD_ITEMS_SUCCESS:
      for (let i = 0; i < state.items.length; i++) {
        newItems.push(state.items[i]);
      }
      newItems.push(action.item);
      return { ...state, loading: false, items: newItems };
    case SET_LIST_NAME:
      return { ...state, name: action.name };
    case GET_LIST_META_REQUEST:
      return { ...state, loading: false };
    case GET_LIST_META_SUCCESS:
      return { ...state, name: action.name, loading: false };
    case GET_LIST_META_ERROR:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}
