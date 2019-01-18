import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
  SET_LIST_NAME,
  PATCH_ITEM,
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

    case SET_LIST_NAME:
      return { ...state, name: action.name };

    case PATCH_ITEM: {
      const { item: newItem } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== newItem.id) {
            return item;
          }

          // Update fields
          return { ...item, ...newItem };
        }),
      };
    }

    default:
      return state;
  }
}
