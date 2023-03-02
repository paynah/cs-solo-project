import React from 'react';

const TripCard = props => {

  return (
    <div className="trip-card">
      <img className="trip-image"
        src="https://www.exoticca.com/uk/magazine/wp-content/uploads/2019/05/The-12-most-spectacular-beaches-in-hawaii-that-you-cannot-miss.jpg" />
      <div className="trip-name">HAWAII</div>
      <div className="trip-dates">May 1-8, 2023</div>
    </div>
  )
};

export default TripCard;