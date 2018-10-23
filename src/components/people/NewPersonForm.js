import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import ErrorField from "../common/ErrorField";
import emailValidator from "email-validator";

class NewPersonForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="firsName" component={ErrorField} />
            <Field name="lastName" component={ErrorField} />
            <Field name="email" component={ErrorField} />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

function validate({ firstName, email }) {
  const errors = {};
  if (!firstName) errors.firstName = "first name is required";

  if (!email) errors.email = "email os required";
  else if (!validateEmail.validate(email)) errors.email = "email is invalid";

  return errors;
}

export default reduxForm({
  form: "person",
  validate
})(NewPersonForm);
