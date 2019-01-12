import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import auth from '../../actions/auth/auth';

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home page</h1>
    {!isAuthenticated ? (
      <Link to="/login">Login</Link>
    ) : (
      <Button onClick={logout} secondary>
        Logout
      </Button>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(
  state => ({
    isAuthenticated: Boolean(state.user.token)
  }),
  dispatch => ({
    logout: () => dispatch(auth.logoutAPI())
  })
)(HomePage);
