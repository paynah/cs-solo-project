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

  const followupMsg = props.user.trips.length > 0 ? 'Select a trip below or start a new one!' : 'It doesn\'t look like you have any trips currently planned!';
  console.log(props.user.trips);
  const trips = [];
  for (let i = 0; i < props.user.trips.length; i++) {
    const curTrip = props.user.trips[i];
    trips.push(
      <TripCard
        key={curTrip.tripid}
        endDate={curTrip.enddate}
        startDate={curTrip.startdate}
        tripName={curTrip.tripname}
      />);
  }
  return (
    <div>
      <div id="main-message">
        <div id="user-greeting-msg">Hi, {props.user.name}!</div>
        <div id="user-followup-msg">{followupMsg}</div>
        <button id="newTripBtn" onMouseOver={() => showConfetti()}>Start a New Trip!</button>
      </div>
      <div id="trips">
        {trips}
      </div>
    </div>
  );
};

export default Main;