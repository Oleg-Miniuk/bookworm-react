import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from '../forms/SignUpForm';
import users from '../../actions/users/users';

class SignUpPage extends React.Component {
  submit = data => {
    const { signUp, history } = this.props;
    return signUp(data).then(() => history.push('/dashboard'));
  };

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signUp: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    signUp: (...data) => dispatch(users.signUpAPI(...data))
  })
)(SignUpPage);
