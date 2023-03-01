import React from 'react';

const LoginForm = props => {

  const errorMsg = props.showError ? <div id="login-error-msg" className="error-msg">Invalid username and/or password.</div> : null;

  return (
    <div id="login-form" className="signupLoginForm">
      <h1>Log In</h1>
      <form autoComplete="off">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required />
        <button
          id="loginBtn"
          type="submit"
          onClick={(event) => {
            event.preventDefault();

            const email = document.querySelector('#email').value;
            const pw = document.querySelector('#password').value;

            props.onLoginBtnClick(email, pw)
          }
          }>
          Log in
        </button>
      </form>
      {errorMsg}
      <div id="no-account">
        Don't have an account?
        <span
          id="sign-up"
          onClick={() => props.onSignupLinkClick()}>
          Sign Up!
        </span>
      </div>
    </div>
  )
};

export default LoginForm;