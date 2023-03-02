const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const tripController = require('../controllers/tripController.js');

router.get('/user/:userId/trip', tripController.getTripsByUser, (req, res) => {
  return res.status(200).json(res.locals.trips);
});

router.post('/user', userController.createUser, (req, res) => {
  return res.status(200).send();
});

router.post('/user/login', 
  userController.verifyUser,
  userController.getUserTrips, 
  (req, res) => {
  return res.status(200).json(res.locals.verifyUser)
});

router.post('/trip', tripController.createTrip, (req, res) => {
  return res.status(200).send();
});

module.exports = router;