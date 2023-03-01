import React, { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    fetch('/api/test')
      .then(response => response.json())
      .then(data => console.log('hurray!'))
      .catch(error => console.log(error));
  }, []);

  return (
    <div><h1>Hello, world!</h1></div>
  )
};

export default App;