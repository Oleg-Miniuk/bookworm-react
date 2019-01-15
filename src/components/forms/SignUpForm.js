import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class SignUpForm extends React.Component {
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
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignUpForm;
