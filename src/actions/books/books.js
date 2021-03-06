import { normalize } from 'normalizr';
import { BOOKS_FETCHED, BOOK_CREATED } from '../../types/types';
import api from '../../api/api';
import schemas from '../../schemas/schemas';

// data.entities.books
const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});

const bookCreated = data => ({
  type: BOOK_CREATED,
  data
});

export const fetchBooks = () => dispatch =>
  api.books
    .fetchAll()
    .then(books =>
      dispatch(booksFetched(normalize(books, [schemas.bookSchema])))
    );

export const createBook = data => dispatch =>
  api.books
    .create(data)
    .then(book => dispatch(bookCreated(normalize(book, schemas.bookSchema))));
