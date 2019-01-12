import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-disable */

const getInitialState = () => {
  if (localStorage.bookwormJWT) {
    return {
      user: {
        token: localStorage.bookwormJWT
      }
    };
  }
};

const store = createStore(
  rootReducer,
  getInitialState(),
  composeEnhancers(applyMiddleware(thunk))
);

const { dispatch, getState } = store;

export { store, dispatch, getState };
