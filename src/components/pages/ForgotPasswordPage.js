import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import auth from '../../actions/auth/auth';

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props.resetPasswordRequest(data).then(() =>
      this.setState({
        success: true
      })
    );

  render() {
    const { success } = this.state;
    return (
      <div>
        {success ? (
          <Message>Email has been sent</Message>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    resetPasswordRequest: (...args) =>
      dispatch(auth.resetPasswordRequestAPI(...args))
  })
)(ForgotPasswordPage);
