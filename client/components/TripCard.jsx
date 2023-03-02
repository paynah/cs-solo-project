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

    const getMonthAndDateStr = (targetDate) => {
      let resultStr = '';
      if (targetDate != null) {
        resultStr = monthNames[targetDate.getMonth()] + ' ' + targetDate.getDate();
      }
      return resultStr;
    }

    let dateStr = '';
    const startDate = props.startDate ? new Date(props.startDate) : null;
    const endDate = props.endDate ? new Date(props.endDate) : null;
    const startDateMonthDay = getMonthAndDateStr(startDate);
    const endDateMonthDay = getMonthAndDateStr(endDate);

    if (startDate === null && endDate === null) {
      return dateStr;
    } else {
      if (startDate && endDate === null) {
        dateStr = startDateMonthDay + ', ' + startDate.getFullYear() + ' - ';
      } else if (startDate === null && endDate) {
        dateStr = ' - ' + endDateMonthDay + ', ' + endDate.getFullYear();
      } else {
        if (startDate.getFullYear() === endDate.getFullYear()) {
          if (startDate.getMonth() === endDate.getMonth()) {
            // May 1-8, 2023
            dateStr = startDateMonthDay + '-' + endDate.getDate()
              + ', ' + startDate.getFullYear();
          } else {
            // May 1 - June 3, 2023
            dateStr = startDateMonthDay + ' - '
              + endDateMonthDay + ', ' + startDate.getFullYear();
          }
        } else {
          // May 1, 2023 - June 3, 2024
          dateStr = startDateMonthDay + ', ' + startDate.getFullYear
            + ' - ' + endDateMonthDay + ', ' + endDate.getFullYear();
        }
      }
    }
    return dateStr;
  }

  return (
    <div className="trip-card">
      <img className="trip-image"
        src={`${props.imageUrl}`} />
      <div className="trip-name">{props.tripName.toUpperCase()}</div>
      <div className="trip-dates">{buildDateStr()}</div>
    </div>
  )
};

export default TripCard;