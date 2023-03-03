import React from 'react';

const TripNav = props => {
  return (
    <div id="trip-nav">
      <span className="trip-nav-option selected">Overview</span>
      <span className="trip-nav-option">Transportation</span>
      <span className="trip-nav-option">Lodging</span>
      <span className="trip-nav-option">Budget</span>
      <span className="trip-nav-option">Itinerary</span>
      <span className="trip-nav-option">Packing List</span>
      <span className="trip-nav-option">Notes</span>
    </div>
  );
};

export default TripNav;