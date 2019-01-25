import { createSelector } from 'reselect';

const booksSelector = state => state.books;

const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);

export default {
  allBooksSelector,
  booksSelector
};
