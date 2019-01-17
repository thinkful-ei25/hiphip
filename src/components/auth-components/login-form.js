import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import './login-form.css';
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
    const logo = <div className="welcome">Grocery Course</div>;
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {logo}
        {error}
        <Field
          className="login-field"
          label="Username"
          component={Input}
          // component='input'
          type="text"
          name="username"
          validate={[required, nonEmpty]}
        />

        <Field
          label="Password"
          className="input-form"
          component={Input}
          // component='input'
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <button
          className="button input-form login-btn"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
