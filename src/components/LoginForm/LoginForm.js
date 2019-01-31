import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../Input';
import { login, authError } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import { Link } from 'react-router-dom';

import './LoginForm.css';

export class LoginForm extends Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  demoLogin() {
    return this.props
      .dispatch(login('demo', 'password'))
      .catch(err => console.log(err));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    const register = (
      <Link className="button button--primary" to="/register">
        Register
      </Link>
    );

    const demo = (
      <div className="button button--secondary" onClick={e => this.demoLogin()}>
        Demo
      </div>
    );
    return (
      <form
        className="LoginForm"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <legend>
          <h2>Login</h2>
        </legend>
        {error}
        <Field
          className="login-field"
          label="Username"
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty]}
        />

        <Field
          label="Password"
          className="login-field"
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <button
          className="button--submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log In
        </button>
        {register}
        {demo}
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
