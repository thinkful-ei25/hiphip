import {
  TOGGLE_CHECKED,
  ADD_ITEM_REQUEST,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
  SET_LIST_NAME,
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
      return {
        ...state,
        loading: false,
        name: action.shoppingList.name,
        store: action.shoppingList.store,
        items: action.shoppingList.items,
        error: false,
      };

    case ADD_ITEM_REQUEST:
      return { ...state, loading: true };

    case ADD_ITEM_ERROR:
      return { ...state, error: action.error };

    case ADD_ITEM_SUCCESS:
      for (let i = 0; i < state.items.length; i++) {
        newItems.push(state.items[i]);
      }
      newItems.push(action.item);
      return { ...state, loading: false, items: newItems };

    case SET_LIST_NAME:
      return { ...state, name: action.name };

    default:
      return state;
  }
}
