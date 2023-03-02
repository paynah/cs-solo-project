import React, { useEffect, useState, useRef } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Header from './components/Header.jsx';
import SignupForm from './components/SignupForm.jsx';
import Main from "./components/Main.jsx";
import TripWizard from './components/TripWizard.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const user = useRef(null);

  const onLoginBtnClick = (email, password) => {
    console.log('Login button got clicked!');

    if (!email.length || !password.length) {
      setShowLoginError(true);
      return;
    }

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
          setShowLoginError(false);
          setIsLoggedIn(true);
          user.current = data;
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
          onLoginBtnClick(email, password);
        }
      })
      .catch(err => console.log('Create User fetch /api/user: ERROR: ', err));
  }

  const onWizardCancelClick = () => {
    console.log('Wizard Cancel option clicked!');
    setShowWizard(false);
  }

  const onStartNewTripClick = () => {
    console.log('Start New Trip button clicked!');
    setShowWizard(true);
  }

  const onNewTripFinishClick = (newTripInfo) => {
    console.log('New Trip Finish button clicked!');
  }

  let formToRender;
  if (isLoggedIn) {
    formToRender = showWizard ?
      <TripWizard
        onCancelClick={onWizardCancelClick}
        onFinishClick={onNewTripFinishClick}
        userName={user.current.name} />
      : <Main
        user={user.current}
        onStartNewTrip={onStartNewTripClick} />
  } else {
    if (showSignup) {
      formToRender = <SignupForm
        onSignupBtnClick={onSignupBtnClick} />
    } else {
      formToRender = <LoginForm
        onLoginBtnClick={onLoginBtnClick}
        onSignupLinkClick={onSignupLinkClick}
        showError={showLoginError} />
    }
  }

  return (
    <div>
      <Header />
      {formToRender}
    </div >
  )
};

export default App;