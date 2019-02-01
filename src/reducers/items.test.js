import itemReducer from './items';
import {
  PATCH_ITEM_REQUEST,
  PATCH_ITEM_ERROR,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_ERROR,
} from '../actions/items';

describe('PATCH_ITEM', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      items: [
        { id: 0, name: 'item0' },
        { id: 1, name: 'item1' },
        { id: 2, name: 'item2', checked: 'false' },
        { id: 3, name: 'item3' },
      ],
    };
  });

  it('should set original and updated on request', () => {
    const fixture = {
      type: PATCH_ITEM_REQUEST,
      originalItem: initialState.items[2],
      updatedItem: { id: 2, name: 'item2', checked: true },
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[2]).toEqual(fixture.updatedItem);
    expect(state.patchItemReq).toEqual(fixture.originalItem);
  });

  it('should reset the original on failure', () => {
    initialState.patchItemReq = { id: 2, name: 'item2', checked: true };
    const fixture = {
      type: PATCH_ITEM_ERROR,
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[2].checked).toBeTruthy();
  });
});

describe('DELETE_ITEM', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [{ id: '0' }, { id: '1' }, { id: '2' }],
    };
  });

  describe('REQUEST', () => {
    it('should remove the item', () => {
      const action = {
        type: DELETE_ITEM_REQUEST,
        id: '1',
      };

      const state = itemReducer(initialState, action);
      expect(state.items.length).toEqual(2);
      expect(state.items).not.toContainEqual({ id: '1' });
    });
  });

  describe('ERROR', () => {
    const action = {
      type: DELETE_ITEM_ERROR,
      id: '1',
      error: { message: 'Error' },
    };

    it('should set the error', () => {
      const state = itemReducer(initialState, action);
      expect(state.error).toEqual(action.error);
    });
  });

  describe('REQUEST', () => {
    it('should remove the item from the items list', () => {
      const action = {
        type: DELETE_ITEM_REQUEST,
        id: '1',
      };

      const state = itemReducer(initialState, action);
      expect(state.items).toHaveLength(2);
      expect(state.items).not.toContainEqual({ id: '1' });
    });
  });
});
