import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ITEMS_ERROR,
  GET_ITEMS_SUCCESS,
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
  REORDER_REQUEST,
  REORDER_ERROR,
  REORDER_SUCCESS,
  CHANGE_LIST_NAME_REQUEST,
  CHANGE_LIST_NAME_SUCCESS,
  CHANGE_LIST_NAME_ERROR,
  EDIT_LIST_NAME,
} from '../actions/items';

const initialState = {
  id: null,
  name: null,
  store: null,
  items: [],
  loading: false,
  error: false,
  aislePrompt: null,
  sorted: true,
  reverseSorted: false,
  editingName: false,
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

    case EDIT_LIST_NAME: {
      return { ...state, editingName: !state.editingName };
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
      console.log(action);
      return {
        ...state,
        items: action.items,
      };
    }
    case CHANGE_LIST_NAME_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case CHANGE_LIST_NAME_SUCCESS: {
      return {
        ...state,
        name: action.name,
        loading: false,
        editingName: false,
      };
    }
    case CHANGE_LIST_NAME_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        editingName: false,
      };

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

    case REORDER_REQUEST:
      return {
        ...state,
      };
    case REORDER_ERROR:
      const { error } = action;
      return { ...state, error, loading: false };

    case REORDER_SUCCESS:
      return { ...state, items: action.items, loading: false };

    default:
      return state;
  }
}
