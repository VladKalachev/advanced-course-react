import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import emailValidator from "email-validator";
import ErrorField from "../common/ErrorField";

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Field name="email" component={ErrorField} />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component={ErrorField} type="password" />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) errors.email = "email is required";
  else if (!emailValidator.validate(email)) errors.email = "invalid email";

  if (!password) errors.password = "passord is required";
  else if (password.lenght < 8) errors.password = "to short";

  return errors;
};

export default reduxForm({
  form: "auth",
  validate
})(SignUpForm);
