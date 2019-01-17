import { TOGGLE_CHECKED } from '../actions/items';
const initialState = {
  id: 2,
  name: 'Fiesta',
  store: { name: 'Fiesta List', address: '123456 st' },
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHECKED:
      const toggledItems = state.items.map(item => {
        if (item.id === action.itemId) {
          item.checked = !item.checked;
        }
        return item;
      });
      return { ...state, toggledItems };
    default:
      return state;
  }
}
