const db = require('../models/vacationModels.js');
const errorGen = require('../models/errorModel.js');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email.length && password.length) {
    const params = [email, password];
    let query = `
    SELECT *
    FROM vacation_user 
    WHERE email = $1
	    AND password = $2
    `;

    // TO DO - run additional query to get all of user's trips and store in res.locals


    try {
      const { rows } = await db.query(query, params);
      if (rows.length > 0) {
        // If a user has been found, grab the first result and attach the user's name
        // to res.locals under the 'verifyUser' property
        console.log(`UserController.verifyUser: User ${rows[0].name} found!`);
        console.log(rows[0]);
        res.locals.verifyUser = {
          id: rows[0]._id, 
          name: rows[0].name
        };

        // If we found a user, also query for their trips
        params.splice(params.length);
        params.push(res.locals.verifyUser.id);
        query = `
        SELECT _id AS TripId, name AS TripName, StartDate, EndDate
        FROM Trip
        WHERE UserID=$1
        `;
      } else {
        console.log('UserController.verifyUser: User not found');
        res.locals.verifyUser = "User not found";
      }

      return next();
    } catch (err) {
      return next(errorGen.createErrorObj('userController.verifyUser error', err.message));
    }
  } else {
    return next(errorGen.createErrorObj('userController.verifyUser error', 'Required fields are missing or empty'));
  }
}

userController.getUserTrips = async (req, res, next) => {
  const params = [res.locals.verifyUser.id];
  let query = `
  SELECT _id AS TripId, name AS TripName, StartDate, EndDate
  FROM Trip
  WHERE UserID=$1
  `;

  try {
    const { rows } = await db.query(query, params);
    if (rows.length > 0) {
      console.log(`UserController.getUserTrips: trips found!`);
    } else {
      console.log('UserController.getUserTrips: No trips found');
    }
    res.locals.verifyUser.trips = rows;
    return next();
  } catch (err) {
    return next(errorGen.createErrorObj('userController.getUserTrips error', err.message));
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