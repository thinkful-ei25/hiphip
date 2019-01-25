import itemReducer from './items';
import {
  PATCH_ITEM_SUCCESS,
  PATCH_ITEM_REQUEST,
  PATCH_ITEM_ERROR,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
} from '../actions/items';

describe('PATCH_ITEM_SUCCESS', () => {
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

  it('should update the item using the object in the action', () => {
    const fixture = {
      type: PATCH_ITEM_SUCCESS,
      item: {
        id: 2,
        name: 'fixture',
      },
    };

    const state = itemReducer(initialState, fixture);

    expect(state.items[2].name).toEqual(fixture.item.name);
    expect(state.items[2].checked).toEqual(initialState.items[2].checked);
  });

  it('should create a new object', () => {
    const fixture = {
      type: PATCH_ITEM_SUCCESS,
      item: {
        id: 2,
        name: 'fixture',
      },
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[2]).not.toBe(fixture.item);
  });

  it('should clear the loading flag', () => {
    initialState.items[2].loading = true;
    const fixture = {
      type: PATCH_ITEM_SUCCESS,
      item: {
        id: 2,
        name: 'fixture',
      },
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[2].loading).toBeUndefined();
  });
});

describe('PATCH_ITEM_REQUEST', () => {
  it("should set an item's loading flag", () => {
    const initialState = {
      items: [{ id: '0', name: 'item0' }],
    };

    const fixture = {
      type: PATCH_ITEM_REQUEST,
      itemId: '0',
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[0].loading).toBeTruthy();
  });
});

describe('PATCH_ITEM_ERROR', () => {
  const initialState = {
    items: [{ id: '0', name: 'item0', loading: true }],
  };

  const fixture = {
    type: PATCH_ITEM_ERROR,
    itemId: '0',
    error: { code: 404, message: 'Not found' },
  };

  const state = itemReducer(initialState, fixture);
  expect(state.error).toEqual(fixture.error);
  expect(state.items[0].loading).toBeUndefined();
});

describe('DELETE_ITEM', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [{ id: '0' }, { id: '1' }, { id: '2' }],
    };
  });

  describe('REQUEST', () => {
    it('should add a loading flag to the appropiate action', () => {
      const action = {
        type: DELETE_ITEM_REQUEST,
        id: '1',
      };

      const state = itemReducer(initialState, action);
      expect(state.items[1].loading).toBeTruthy();
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

    it('should clear the loading flag', () => {
      initialState.items[1].loading = true;
      const state = itemReducer(initialState, action);
      expect(state.items[1].loading).toBeUndefined();
    });
  });

  describe('SUCCESS', () => {
    it('should remove the item from the items list', () => {
      const action = {
        type: DELETE_ITEM_SUCCESS,
        id: '1',
      };

      const state = itemReducer(initialState, action);
      expect(state.items).toHaveLength(2);
      expect(state.items).not.toContainEqual({ id: '1' });
    });
  });
});
