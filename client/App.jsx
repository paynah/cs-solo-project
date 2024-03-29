import React, { useEffect, useState, useRef } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Header from './components/Header.jsx';
import SignupForm from './components/SignupForm.jsx';
import Main from "./components/Main.jsx";
import TripWizard from './components/TripWizard.jsx';
import Trip from './components/Trip.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showTrip, setShowTrip] = useState(false);
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
          user.current = data;
          setShowLoginError(false);
          setIsLoggedIn(true);
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
    console.log(newTripInfo);
    const tripName = newTripInfo.name;
    const startDate = newTripInfo.startDate === '' ? null : newTripInfo.startDate;
    const endDate = newTripInfo.endDate === '' ? null : newTripInfo.endDate;
    const imageUrl = newTripInfo.imageUrl;
    const userId = user.current.id;

    const body = { userId, tripName, startDate, endDate, imageUrl };

    fetch('/api/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(data => {
        if (data.status === 200) {
          console.log('hurray, trip was successfully created!');
          getUserTrips(() => {
            setShowWizard(false);
          });
        } else {
          console.log('Create Trip fetch /api/trip: ERROR: ', data);
        }
      })
      .catch(err => console.log('Create Trip fetch /api/trip: ERROR: ', err));
  }

  const getUserTrips = (nextFunc) => {
    fetch(`/api/user/${user.current.id}/trip`, {
      method: 'GET'
    })
      .then(data => data.json())
      .then(data => {
        console.log('Get Trips By User ID result: ', data);
        user.current.trips = data;
        nextFunc();
      })
      .catch(err => console.log('Get Trips by User ID fetch /api/user/{userId}/trip: ERROR: ', err));
  }

  const onTripCardClick = (tripDetails) => {
    console.log('APP JSX', tripDetails);
    user.current.targetTrip = tripDetails;
    setShowTrip(true);
  }

  let formToRender;
  if (isLoggedIn) {
    if (showWizard) {
      formToRender = <TripWizard
        onCancelClick={onWizardCancelClick}
        onFinishClick={onNewTripFinishClick}
        userName={user.current.name} />
    } else if (showTrip) {
      formToRender = <Trip tripDetails={user.current.targetTrip} />
    } else {
      formToRender = <Main
        user={user.current}
        onStartNewTrip={onStartNewTripClick}
        onTripCardClick={onTripCardClick} />
    }
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
      {/* <TripWizard
        onCancelClick={onWizardCancelClick}
        onFinishClick={onNewTripFinishClick}
        userName='Nancy' /> */}
      {/* <Trip /> */}
    </div >
  )
};

export default App;