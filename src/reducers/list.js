import { TOGGLE_CHECKED } from '../actions/items';
const initialState = {
  id: 2,
  name: 'Fiesta',
  store: { name: 'Fiesta List', address: '123456 st' },
  items: [
    { name: 'pears', aisle: 'produce', checked: false, id: 1234 },
    { name: 'mill', aisle: 'dairy', checked: true, id: 1224 },
    { name: 'corn tortillas', aisle: 2, checked: true, id: 1124 },
    { name: 'incense', aisle: null, checked: false, id: 1344 },
  ],
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
