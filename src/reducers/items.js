import {
  TOGGLE_CHECKED,
  ADD_ITEM_REQUEST,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
  SET_LIST_NAME,
  UPDATE_AISLE_DATA_REQUEST,
  UPDATE_AISLE_DATA_SUCCESS,
  UPDATE_AISLE_DATA_ERROR,
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
  switch (action.type) {
    case TOGGLE_CHECKED:
      const toggledItems = state.items.map(item => {
        if (item.id === action.itemId) {
          if (!item.checked) {
            if (!item.aisleLocation) {
              item.displayAddAisleForm = true;
            }
            item.checked = !item.checked;
          } /* else {
            item.displayAddAisleForm = false;
          } */
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
      return { ...state, loading: true, error: null };

    case ADD_ITEM_ERROR:
      return { ...state, error: action.error, loading: false };

    case ADD_ITEM_SUCCESS: {
      const newItems = [...state.items, action.item];
      return { ...state, loading: false, items: newItems };
    }
    case UPDATE_AISLE_DATA_REQUEST: {
      return { ...state };
    }
    case UPDATE_AISLE_DATA_SUCCESS:
      const updatedItem = state.items.map(item => {
        if (item.id === action.item.id) {
          action.item.displayAddAisleForm = false;
          action.item.checked = true;
          return action.item;
        } else {
          return item;
        }
      });
      return { ...state, items: updatedItem };

    case UPDATE_AISLE_DATA_ERROR:
      return { ...state, error: action.err };

    case SET_LIST_NAME:
      return { ...state, name: action.name };

    default:
      return state;
  }
}
