import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import Input from './Input';
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
        {error}
        <div className="addItemInputs">
          <Field
            name="name"
            className="add-item-field"
            label="Item"
            type="text"
            component={Input}
          />

          <Field
            name="aisleLocation"
            label="Aisle"
            component={Input}
            type="text"
          />
        </div>
        <button
          className="button input-form"
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
