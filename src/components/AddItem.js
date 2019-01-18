import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './auth-components/input';
import { addItemToList } from '../actions/items';

export class AddItem extends React.Component {
  onSubmit(values) {
    const { listId } = this.props;
    this.props.dispatch(addItemToList(values, listId));
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
    return (
      <form
        className="add-item-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          name="name"
          className="add-item-field"
          label="Item"
          component="input"
        />

        <Field
          name="aisleLocation"
          label="Aisle"
          component="input"
          type="text"
        />
        <button
          className="button input-form login-btn"
          disabled={this.props.pristine || this.props.submitting}
        >
          Add Item
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(AddItem);
