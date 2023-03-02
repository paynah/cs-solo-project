import React, { useState } from 'react';

const TripWizard = props => {
  const name = 'Nancy';
  const [steps, setSteps] = useState(
    [
      {
        top: 'Alright, ' + name + '!',
        bottom: 'What would you like to call your new trip?',
        addlElements: <input id='trip-new-name' type="text" />
      },
      {
        top: 'Sounds great.',
        bottom: 'Do you want to add some dates for this trip?'
      },
      {
        top: 'Excellent!',
        bottom: 'One last thing - do you want to add a photo for some travel inspo?'
      }
    ]
  );
  const [curStep, setCurStep] = useState(0);

  return (
    <div id="trip-wizard">
      <div>{steps[curStep].top}</div>
      <div id='step-bottom-line'>{steps[curStep].bottom}</div>
      {steps[curStep].addlElements}
    </div>
  );
};

export default TripWizard;