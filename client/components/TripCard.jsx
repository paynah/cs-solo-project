import React from 'react';

const TripCard = props => {

  const buildDateStr = () => {
    const monthNames = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
    let dateStr = '';
    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);

    if (startDate.getFullYear() === endDate.getFullYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        // May 1-8, 2023
        dateStr = monthNames[startDate.getMonth()]
          + ' ' + startDate.getDate() + '-' + endDate.getDate()
          + ', ' + startDate.getFullYear();
      } else {
        // May 1 - June 3, 2023
        dateStr = monthNames[startDate.getMonth()] + ' '
          + startDate.getDate() + ' - ' + monthNames[endDate.getMonth()]
          + ' ' + endDate.getDate() + ', ' + startDate.getFullYear();
      }
    } else {
      // May 1, 2023 - June 3, 2024
      dateStr = monthNames[startDate.getMonth()] + ' '
        + startDate.getDate() + ', ' + startDate.getFullYear
        + ' - ' + monthNames[endDate.getMonth()]
        + ' ' + endDate.getDate() + ', ' + endDate.getFullYear();
    }

    return dateStr;
  }

  return (
    <div className="trip-card">
      <img className="trip-image"
        src="https://www.exoticca.com/uk/magazine/wp-content/uploads/2019/05/The-12-most-spectacular-beaches-in-hawaii-that-you-cannot-miss.jpg" />
      <div className="trip-name">{props.tripName.toUpperCase()}</div>
      <div className="trip-dates">{buildDateStr()}</div>
    </div>
  )
};

export default TripCard;