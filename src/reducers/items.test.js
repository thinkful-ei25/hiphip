import itemReducer from './items';
import { PATCH_ITEM } from '../actions/items';

describe('PATCH_ITEM', () => {
  const initialState = {
    items: [
      { id: 0, name: 'item0' },
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2', checked: 'false' },
      { id: 3, name: 'item3' },
    ],
  };

  it('should update the item using the object in the action', () => {
    const fixture = {
      type: PATCH_ITEM,
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
      type: PATCH_ITEM,
      item: {
        id: 2,
        name: 'fixture',
      },
    };

    const state = itemReducer(initialState, fixture);
    expect(state.items[2]).not.toBe(fixture.item);
  });
});
