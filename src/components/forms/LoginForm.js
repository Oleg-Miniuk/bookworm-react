import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
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
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data = {}, errors = {}, loading = {} } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors && errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
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
        <Form.Field error={Boolean(errors.password)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
