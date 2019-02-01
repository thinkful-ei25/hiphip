import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../Input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import { Link } from 'react-router-dom';

import './LoginForm.css';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit(values) {
    this.setState({ error: null });
    return this.props.dispatch(login(values.username, values.password));
  }

  demoLogin() {
    return this.props.dispatch(login('demo', 'password')).catch(err => {
      if (err.message === 'Submit Validation Failed') {
        this.setState({ error: 'Demo account does not exist' });
      }
    });
  }

  render() {
    let error, demoError;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    if (this.state.error) {
      demoError = (
        <div className="form-error" aria-live="polite">
          {this.state.error}
        </div>
      );
    }
    const register = (
      <Link className="button button--primary" to="/register">
        Register
      </Link>
    );

    const demo = (
      <button
        type="button"
        className="button button--secondary"
        onClick={e => this.demoLogin()}
      >
        Demo
      </button>
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
        {demoError}
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
