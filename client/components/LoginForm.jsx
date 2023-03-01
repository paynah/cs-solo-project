import React from 'react';

const LoginForm = props => {

  // useEffect(() => {
  //   fetch('/api/test')
  //     .then(response => response.json())
  //     .then(data => console.log('hurray!'))
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <div id="login-form">
      <h1>Log In</h1>
      <form>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Log in</button>
      </form>
      <div id="no-account">
        Don't have an account?
        <span id="sign-up">Sign Up!</span>
      </div>
    </div>
  )
};

export default LoginForm;