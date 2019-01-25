import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddBookCtA from '../ctas/AddBookCtA';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import booksSelectors from '../../selectors/books/booksSelectors';

class DashboardPage extends Component {
  componentDidMount = () => {};

  render() {
    const { isAuthenticated, books } = this.props;
    return !isAuthenticated ? (
      <ConfirmEmailMessage />
    ) : books.length === 0 ? (
      <AddBookCtA />
    ) : (
      <p>You have books!</p>
    );
  }
}

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(state => ({
  isAuthenticated: Boolean(state.user.token),
  books: booksSelectors.allBooksSelector(state)
}))(DashboardPage);
