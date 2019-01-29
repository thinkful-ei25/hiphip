import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from '../Input';
import { Link } from 'react-router-dom';
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
} from '../../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    const returnToLogin = (
      <Link to="/">
        <button className="login-btn">Return to Log In</button>
      </Link>
    );
    const form = (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          label="First Name"
          className="registration-input"
          component={Input}
          type="text"
          name="firstName"
        />
        <Field
          label="Last Name"
          className="registration-input"
          component={Input}
          type="text"
          name="lastName"
        />
        <Field
          label="Username"
          className="registration-input"
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          label="Password"
          className="registration-input"
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <Field
          label="Confirm Password"
          className="registration-input"
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button
          className="login-btn"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    );
    return (
      <main className="formWrap">
        {form}
        {returnToLogin}
      </main>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0])),
})(RegistrationForm);
