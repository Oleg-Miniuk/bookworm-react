import { combineReducers } from 'redux';

import user from './user/user';
import books from './books/books';

export default combineReducers({
  user,
  books
});
