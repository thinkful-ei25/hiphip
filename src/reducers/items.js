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
  tempItemId: null,
  delItemReq: null,
  patchItemReq: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return { ...state, loading: true };

    case GET_ITEMS_ERROR:
      return { ...state, loading: false, error: action.error };

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        name: action.shoppingList.name,
        store: action.shoppingList.store,
        items: action.shoppingList.items,
        error: null,
      };

    case ADD_ITEM_REQUEST:
      const { item } = action;
      const newItemRequest = [...state.items, item];
      return {
        ...state,
        items: newItemRequest,
        tempItemId: item.id,
        error: null,
      };

    case ADD_ITEM_ERROR:
      const removedNewItem = state.items.filter(
        item => item.id !== state.tempItemId
      );
      return {
        ...state,
        error: action.error,
        loading: false,
        tempItemId: null,
        items: removedNewItem,
      };

    case ADD_ITEM_SUCCESS: {
      const newItems = state.items.map(item => {
        if (item.id === state.tempItemId) {
          item = action.item;
        }
        return item;
      });
      return { ...state, loading: false, tempItemId: null, items: newItems };
    }

    case PATCH_ITEM_REQUEST: {
      const { originalItem, updatedItem } = action;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== originalItem.id) {
            return item;
          }
          state.patchItemReq = originalItem;
          return { ...item, ...updatedItem };
        }),
      };
    }

    case PATCH_ITEM_ERROR: {
      const { error } = action;
      return {
        ...state,
        error,
        items: state.items.map(item => {
          if (item.id !== state.patchItemReq.id) {
            return item;
          }
          return state.patchItemReq;
        }),
        patchItemReq: null,
      };
    }

    case PATCH_ITEM_SUCCESS: {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === state.patchItemReq.id ? action.item : item
        ),
        patchItemReq: null,
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
      let delItemReq;
      const removedItem = state.items.filter(item => {
        if (item.id === id) {
          delItemReq = item;
          return false;
        }
        return true;
      });
      return {
        ...state,
        items: removedItem,
        delItemReq,
      };
    }

    case DELETE_ITEM_ERROR:
      const { error } = action;
      return {
        ...state,
        error,
        items: [...state.items, state.delItemReq],
        delItemReq: null,
      };

    case DELETE_ITEM_SUCCESS: {
      return {
        ...state,
        items: action.items,
        delItemReq: null,
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
      const { error: err } = action;
      return { ...state, err, loading: false };

    case REORDER_SUCCESS:
      return { ...state, items: action.items, loading: false };

    default:
      return state;
  }
}
