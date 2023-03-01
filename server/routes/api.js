const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.post('/user', userController.createUser, (req, res) => {
  return res.status(200).send();
});

router.post('/user/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.verifyUser)
});

module.exports = router;