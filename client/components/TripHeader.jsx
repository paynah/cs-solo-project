import React from 'react';

const TripHeader = props => {

  return (
    <div id='trip-header'>
      <img
        id='trip-header-image'
        src={`${props.imgUrl}`} />
      <div id='trip-header-name'>{`${props.tripName}`}</div>
    </div>
  )

};

export default TripHeader;