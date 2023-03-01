const db = require('../models/vacationModels.js');
const errorGen = require('../models/errorModel.js');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;

  if (email.length && password.length) {
    const params = [email, password];
    const query = `
      SELECT * FROM vacation_user
      WHERE email=$1
        AND password=$2
    `;

    db.query(query, params)
    .then(result => {
      if (result.rows.length > 0) {
        // If a user has been found, grab the first result and attach the user's name
        // to res.locals under the 'verifyUser' property
        console.log(`UserController.verifyUser: User ${result.rows[0].name} found!`);
        res.locals.verifyUser = {name: result.rows[0].name};
      } else {
        console.log('UserController.verifyUser: User not found');
        res.locals.verifyUser = "User not found";
      }
      
      return next();
    })
    .catch(err => {
      return next(errorGen.createErrorObj('userController.verifyUser error', err.message));
    });
  } else {
    return next(errorGen.createErrorObj('userController.verifyUser error', 'Required fields are missing or empty'));
  }
}

userController.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (name.length && email.length && password.length) {
    const params = [name, email, password];
    const query = `
      INSERT INTO vacation_user (name, email, password)
      VALUES ($1, $2, $3)
    `;

    db.query(query, params)
    .then(data => {
      console.log('UserController.createUser: User successfully created!');
      return next();
    })
    .catch(err => {
      return next(errorGen.createErrorObj('userController.createUser error', err.message));
    });
  } else {
    return next(errorGen.createErrorObj('userController.createUser error', 'Required fields are missing or empty'));
  }
}

module.exports = userController;