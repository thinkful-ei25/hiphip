import { ADD_LIST } from '../actions/shoppingLists';

const initialState = {
  lists: ['tamales', 'cakes', 'tea accoutrements'],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        list: state.lists.push(action.newList),
      };
    default:
      return state;
  }
}
