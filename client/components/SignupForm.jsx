import React, { useState } from 'react';

const SignupForm = props => {
  const [showError, setShowError] = useState(false);

  const errorMsg = showError ? <div className="error-msg">Please provide a valid name, email address and password to sign up.</div> : null;

  return (
    <div id="signup-form" className="signupLoginForm">
      <h1>Create an Account</h1>
      <form autoComplete="off">
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="signupName"
          name="signupName" />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="signupEmail"
          name="signupEmail" />
        <label htmlFor="signupPassword">Password</label>
        <input
          type="password"
          id="signupPassword"
          name="signupPassword" />
        <button
          id="signupBtn"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            const name = document.querySelector('#signupName').value;
            const email = document.querySelector('#signupEmail').value;
            const pw = document.querySelector('#signupPassword').value;

            if (email.length && pw.length && name.length) {
              props.onSignupBtnClick(name, email, pw);
            } else {
              setShowError(true);
            }
          }
          }>
          Sign Up
        </button>
      </form>
      {errorMsg}
    </div>
  );
};

export default SignupForm;