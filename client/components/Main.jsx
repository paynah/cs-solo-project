import React from 'react';
import party from 'party-js';
import TripCard from './TripCard.jsx';

const Main = props => {

  const showConfetti = () => {
    const newTripBtn = document.querySelector("#newTripBtn");
    for (let i = 0; i < 3; i++) {
      party.confetti(newTripBtn);
    }
  }

  const followupMsg = props.user.trips.length > 0 ? 'It doesn\'t look like you have any trips currently planned!' : 'Select a trip below or start a new one!';

  return (
    <div>
      <div id="main-message">
        <div id="user-greeting-msg">Hi, {props.user.name}!</div>
        <div id="user-followup-msg">{followupMsg}</div>
        <button id="newTripBtn" onMouseOver={() => showConfetti()}>Start a New Trip!</button>
      </div>
      <div id="trips">
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </div>
  );
};

export default Main;