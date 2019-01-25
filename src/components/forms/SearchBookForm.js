import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends React.Component {
  state = {
    inputValue: '',
    loading: false,
    options: [],
    books: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    const inputValue = data.searchQuery;
    this.setState({
      inputValue
    });
    this.timer = setTimeout(() => this.fetchOptions(inputValue), 1000);
  };

  onChange = (e, data) => {
    this.props.onBookSelect(this.state.books[data.value]);
  };

  fetchOptions = inputValue => {
    if (!inputValue) return;
    this.setState({ loading: true });
    axios
      .get(`/api/books/search?q=${inputValue}`)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.bookId] = book;
          options.push({
            key: book.bookId,
            value: book.bookId,
            text: book.title
          });
        });
        this.setState({ loading: false, options, books: booksHash });
      });
  };

  render() {
    const { inputValue, options, loading } = this.state;
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={inputValue}
          onSearchChange={this.onSearchChange}
          options={options}
          loading={loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;
