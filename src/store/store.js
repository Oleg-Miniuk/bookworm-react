import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-disable */

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const { dispatch, getState } = store;

export { store, dispatch, getState };
