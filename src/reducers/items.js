import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
  SET_LIST_NAME,
  PATCH_ITEM_REQUEST,
  PATCH_ITEM_ERROR,
  PATCH_ITEM_SUCCESS,
  ADD_AISLE_PROMPT,
  REMOVE_AISLE_PROMPT,
  SORT_ITEMS,
  REVERSE_SORT_ITEMS,
} from '../actions/items';
import { compareAisle, sortAisle, reverseSortAisle } from './utils';
const initialState = {
  id: null,
  name: null,
  store: {},
  items: [],
  loading: false,
  error: false,
  aislePrompt: null,
  sorted: false,
  reverseSorted: false,
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

    case PATCH_ITEM_REQUEST: {
      const { itemId } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== itemId) {
            return item;
          }

          return { ...item, loading: true };
        }),
      };
    }

    case PATCH_ITEM_ERROR: {
      const { itemId, error } = action;
      return {
        ...state,
        error,
        items: state.items.map(item => {
          if (item.id !== itemId) {
            return item;
          }

          // If there is a loading property, remove it
          const { loading, ...newItem } = item;
          return newItem;
        }),
      };
    }

    case PATCH_ITEM_SUCCESS: {
      const { item: newItem } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== newItem.id) {
            return item;
          }

          // Remove the loading property from the item, in case it exists
          const { loading, ...itemWithoutLoading } = item;
          return { ...itemWithoutLoading, ...newItem };
        }),
      };
    }

    case ADD_AISLE_PROMPT:
      return { ...state, aislePrompt: action.item };

    case REMOVE_AISLE_PROMPT:
      return { ...state, aislePrompt: null };

    case SORT_ITEMS:
      state.items.sort(compareAisle);
      return {
        ...state,
        sorted: true,
        reverseSorted: false,
        items: state.items.sort(sortAisle),
      };
    case REVERSE_SORT_ITEMS:
      return {
        ...state,
        sorted: false,
        reverseSorted: true,
        items: state.items.sort(reverseSortAisle),
      };
    default:
      return state;
  }
}
