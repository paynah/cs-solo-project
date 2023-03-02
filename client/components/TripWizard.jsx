import React, { useState, useRef } from 'react';
import { showConfetti } from '../helper.js';

const TripWizard = props => {
  const [curStepNum, setCurStepNum] = useState(0);
  const tripWizardStore = useRef
    (
      {
        stepNumber: 0,
        tripInfo: {},
        steps:
          [
            {
              top: 'Alright, ' + props.userName + '!',
              bottom: 'What would you like to call your new trip?',
              addlElements:
                <form
                  onSubmit={(event) => submitTripName(event, document.querySelector('#trip-new-name').value)}
                  autoComplete='off'>
                  <input
                    id='trip-new-name'
                    type="text"
                    className='trip-wizard-input' />
                </form>,
              nextStepOptions:
                <div id="cancel-option"
                  onClick={() => props.onCancelClick()}>
                  Cancel
                </div>
            },
            {
              top: 'Sounds great.',
              bottom: 'Do you want to add some dates for this trip?',
              addlElements:
                <form onSubmit={(event) => submitTripDates(event)}>
                  <input
                    id='trip-start-date'
                    type="date"
                    className='trip-wizard-input'
                    onInput={(event) => changeDate(event)} />
                  <input
                    id='trip-end-date'
                    type="date"
                    className='trip-wizard-input' />
                </form>,
              nextStepOptions:
                <div id='next-steps'>
                  <div id="cancel-option"
                    onClick={() => props.onCancelClick()}>
                    Cancel
                  </div>
                  <div id="next-step-dates"
                    className='next-step'
                    onClick={() => submitTripDates()}>
                    I don't know the dates yet
                  </div>
                </div>
            },
            {
              top: 'Excellent!',
              bottom: 'One last thing - do you want to add a photo for some travel inspo?',
              addlElements:
                <form
                  onSubmit={(event) => submitImgUrl(event)}
                  autoComplete='off'>
                  <input
                    id='trip-image-url-input'
                    type="text"
                    className='trip-wizard-input' />
                </form>,
              nextStepOptions:
                <div id='next-steps'>
                  <div id="cancel-option"
                    onClick={() => props.onCancelClick()}>
                    Cancel
                  </div>
                  <div id="next-step-image-url"
                    className='next-step'
                    onClick={() => submitImgUrl()}
                    onMouseOver={() => showConfetti(document.querySelector('#next-step-image-url'))}>
                    Finish!
                  </div>
                </div>
            }
          ]

      }
    );


  const incrementStepNum = () => {
    tripWizardStore.current.stepNumber = tripWizardStore.current.stepNumber + 1;
    setCurStepNum(tripWizardStore.current.stepNumber);
  }

  const submitTripName = (event, newName) => {
    event.preventDefault();
    if (!newName.length) {
      // TODO - handle if user doesn't input a trip name and presses enter
    } else {
      console.log('New trip name: ', newName);
      tripWizardStore.current.tripInfo.name = newName;
      incrementStepNum();
    }
  }

  const submitTripDates = () => {
    const startDate = document.querySelector('#trip-start-date').value;
    const endDate = document.querySelector('#trip-end-date').value;

    tripWizardStore.current.tripInfo.startDate = startDate;
    tripWizardStore.current.tripInfo.endDate = endDate;

    incrementStepNum();
  }

  const changeDate = (event) => {
    // TODO - using the clear option doesn't trigger the onChange event...
    // So if you use the clear option for both dates, the button text remains as 'Next'
    const newDateValue = event.target.value;
    const otherDateInputId = event.target.id === 'trip-start-date' ? '#trip-end-date' : '#trip-start-date';
    const otherDateVal = document.querySelector(otherDateInputId).value;

    const newNextStepMsg = newDateValue === '' && otherDateVal === '' ? 'I don\'t know the dates yet' : 'Next';
    document.querySelector('#next-step-dates').textContent = newNextStepMsg;
  }

  const submitImgUrl = (event) => {
    if (event) {
      event.preventDefault();
    }

    let url = document.querySelector('#trip-image-url-input').value;
    // Set a default image if no trip image is provided
    url = url === '' ? 'https://drive.google.com/uc?id=1qvJsNr1y15UdA-LEBGJgYNuGfhKX06Xj' : url;
    tripWizardStore.current.tripInfo.imageUrl = url;

    props.onFinishClick(tripWizardStore.current.tripInfo);
  }

  return (
    <div id="trip-wizard">
      <div>{tripWizardStore.current.steps[curStepNum].top}</div>
      <div id='step-bottom-line'>{tripWizardStore.current.steps[curStepNum].bottom}</div>
      {tripWizardStore.current.steps[curStepNum].addlElements}
      {tripWizardStore.current.steps[curStepNum].nextStepOptions}
    </div>
  );
};

export default TripWizard;