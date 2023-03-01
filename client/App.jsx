import React, { useEffect, useState, useRef } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Header from './components/Header.jsx';
import SignupForm from './components/SignupForm.jsx';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);

  const onLoginBtnClick = (email, password) => {
    console.log('Login button got clicked!');

    // Send a GET request to /api/user to find a user, given the input 'email' and 'password'
    const body = { email, password };
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
      .then(data => {
        if (data === 'User not found') {
          setShowLoginError(true);
        } else {
          console.log('hurray, user is verified!', data);
        }
      })
      .catch(err => console.log('Verify User fetch /api/user/login: ERROR: ', err));
  }

  const onSignupLinkClick = () => {
    console.log('Sign up link got clicked!');
    setShowSignup(true);
  }

  const onSignupBtnClick = (name, email, password) => {
    console.log('Signup button got clicked!');
    console.log('name: ', name, ' ; email: ', email, '; password: ', password);

    const body = { name, email, password };
    // Send a POST request to /api/user to create a new user
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 200) {
          console.log('App.jsx: user was successfully created!')
        }
      })
      .catch(err => console.log('Create User fetch /api/user: ERROR: ', err));
  }

  let formToRender;
  if (showSignup) {
    formToRender = <SignupForm
      onSignupBtnClick={onSignupBtnClick} />
  } else {
    formToRender = <LoginForm
      onLoginBtnClick={onLoginBtnClick}
      onSignupLinkClick={onSignupLinkClick}
      showError={showLoginError} />
  }

  return (
    <div>
      <Header />
      {formToRender}
    </div >
  )
};

export default App;