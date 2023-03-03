import React from 'react';

const TripDetail = props => {
  return (
    <div id="trip-detail">
      <span className="trip-detail-label">{props.detailLbl}</span>
      <span className="trip-detail-value">{props.detailVal}</span>
    </div>
  );
};

export default TripDetail;