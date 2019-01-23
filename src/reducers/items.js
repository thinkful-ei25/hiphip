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
  TOGGLE_EDIT_MODE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
  SORT_ITEMS,
  REVERSE_SORT_ITEMS,
  UNSORT_ITEMS,
} from '../actions/items';

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

    case TOGGLE_EDIT_MODE: {
      const { id } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== id) {
            return item;
          }

          return { ...item, isEditing: !item.isEditing };
        }),
      };
    }

    case DELETE_ITEM_REQUEST: {
      const { id } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== id) {
            return item;
          }

          return { ...item, loading: true };
        }),
      };
    }

    case DELETE_ITEM_ERROR: {
      const { id, error } = action;
      return {
        ...state,
        error,
        items: state.items.map(item => {
          if (item.id !== id) {
            return item;
          }

          const { loading, ...withoutLoading } = item;
          return withoutLoading;
        }),
      };
    }

    case DELETE_ITEM_SUCCESS: {
      const { id } = action;
      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
      };
    }

    case SORT_ITEMS:
      return {
        ...state,
        sorted: true,
        reverseSorted: false,
      };
    case REVERSE_SORT_ITEMS:
      return {
        ...state,
        sorted: false,
        reverseSorted: true,
      };
    case UNSORT_ITEMS:
      return {
        ...state,
        sorted: false,
        reverseSorted: false,
      };
    default:
      return state;
  }
}
