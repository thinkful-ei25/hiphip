import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/auth';
import {
  loadAuthToken,
  loadReduxState,
  writeReduxState,
} from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import thunk from 'redux-thunk';

import listsReducer from './reducers/lists';
import itemsReducer from './reducers/items';
import storesReducer from './reducers/yelpAPI';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    lists: listsReducer,
    items: itemsReducer,
    yelpAPI: storesReducer,
  }),
  loadReduxState(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  writeReduxState(store.getState());
});

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}
export default store;
