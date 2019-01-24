import { SET_ONLINE_STATUS } from '../actions/connectivity';
const initialState = {
  online: true,
};

export default function reducer(state = initialState, action) {
  const { type } = action;

  if (type === SET_ONLINE_STATUS) {
    const { online } = action;
    return { ...state, online };
  }

  return state;
}
