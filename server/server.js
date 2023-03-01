const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send('🫠'));


app.listen(PORT);