import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../components/auth-components/input';
export class addItem extends React.Component {
  submitItem(addedItem) {
    this.props.dispatch(addItem(addedItem));
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
    return (
      <form
        className="add-item-form"
        onSubmit={this.props.handleSubmit(addedItem =>
          this.submitItem(addedItem)
        )}
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
})(addItem);
