import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({ isAuthenticated }) =>
  isAuthenticated ? <ConfirmEmailMessage /> : <Redirect to="/" />;

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
  isAuthenticated: Boolean(state.user.token)
}))(DashboardPage);
