const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send('🫠'));


app.listen(PORT);