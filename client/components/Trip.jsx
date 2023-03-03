import React from 'react';
import TripHeader from './TripHeader.jsx';
import TripNav from './TripNav.jsx';
import TripDetail from './TripDetail.jsx';

const Trip = props => {
  console.log('TRIP PROPS', props);

  const tripDetails = [];

  // Start date
  const startDate = new Date(props.tripDetails.startDate);
  const startDateStr = (startDate.getMonth() + 1) + '/'
    + startDate.getDate() + '/' + startDate.getFullYear();
  tripDetails.push(
    <TripDetail detailLbl='Start Date' detailVal={startDateStr} />
  )

  // End date
  const endDate = new Date(props.tripDetails.endDate);
  const endDateStr = (endDate.getMonth() + 1) + '/'
    + endDate.getDate() + '/' + endDate.getFullYear();
  tripDetails.push(
    <TripDetail detailLbl='End Date' detailVal={endDateStr} />
  )

  return (
    <div>
      <TripHeader
        imgUrl={props.tripDetails.imageUrl}
        tripName={props.tripDetails.tripName}
      />
      <TripNav />
      {tripDetails}
    </div>
  );
};

export default Trip;