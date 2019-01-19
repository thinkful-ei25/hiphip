import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../Input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import { Link } from 'react-router-dom';
import './login.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    // console.log(this.props);
    let error;
    if (this.props.error) {
      //   console.log('error:',this.props.error);
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    const register = (
      <Link className="registerLink" to="/register">
        Register
      </Link>
    );
    return (
      <form
        className="form-itself"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}
        <Field
          className="login-field"
          label=""
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty]}
        />

        <Field
          label=""
          className="login-field"
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <button
          className="login-btn"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log In
        </button>
        <br />
        <button className="login-btn">{register}</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
