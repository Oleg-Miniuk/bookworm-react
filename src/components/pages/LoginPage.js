import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import auth from '../../actions/auth/auth';
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot password?</Link>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  null,
  dispatch => ({
    login: (...args) => dispatch(auth.loginAPI(...args))
  })
)(LoginPage);

// export default connect(
//   null,
//   { login }
// )(LoginPage);
