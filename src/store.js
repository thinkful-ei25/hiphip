import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/auth';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import thunk from 'redux-thunk';

import shoppingListReducer from './reducers/shoppingLists';
const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    lists: shoppingListReducer,
  }),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}
export default store;
