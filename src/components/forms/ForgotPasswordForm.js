import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      this.setState(prevData => ({
        data: { ...prevData.data, [fieldName]: fieldValue }
      }));
    }
  };

  onSubmit = () => {
    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });
    if (!Object.keys(errors).length) {
      this.setState({
        loading: true
      });
      submit(data)
        .catch(err =>
          this.setState({
            errors: err.response.data.errors
          })
        )
        .finally(() =>
          this.setState({
            loading: false
          })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  };

  render() {
    const { data = {}, errors = {}, loading = {} } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={Boolean(errors.email)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
