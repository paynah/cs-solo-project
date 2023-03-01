import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm.jsx';

const App = () => {

  // useEffect(() => {
  //   fetch('/api/test')
  //     .then(response => response.json())
  //     .then(data => console.log('hurray!'))
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <div><LoginForm /></div>
  )
};

export default App;