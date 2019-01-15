import { ADD_LIST } from '../actions/shoppingLists';

const initialState = {
  lists: [
    { name: 'Fiesta', address: '2234 42nd St', id: 1 },
    { name: 'Costco', address: '223 82nd St', id: 2 },
    { name: 'C-Town', address: '2 1st Ave', id: 3 },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: state.lists.push(action.newList),
      };
    default:
      return state;
  }
}
