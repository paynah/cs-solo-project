const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const apiRouter = require('./routes/api.js');

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/api/test', (req, res) => {
//   return res.status(200).json({"result": "you got it!"});
// })

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Route handler
app.use('/api/*', apiRouter);
app.use('/api', apiRouter);

// Catch-all route handler for requests to an unknown route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'))
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT);