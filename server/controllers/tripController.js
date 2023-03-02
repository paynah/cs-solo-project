const db = require('../models/vacationModels.js');
const errorGen = require('../models/errorModel.js');

const tripController = {};

tripController.createTrip = async (req, res, next) => {
  const { userId, tripName, startDate, endDate, imageUrl } = req.body;

  if (!Number.isNaN(userId) && tripName.length) {
    try {
      const params = [tripName, startDate, endDate, userId, imageUrl];
      let query = `
      INSERT INTO Trip (name, startdate, enddate, userid, imageurl)
      VALUES ($1, $2, $3, $4, $5)
      `;

      await db.query(query, params);
      return next();
    } catch (error) {
      return next(errorGen.createErrorObj('tripController.createTrip error', err.message));
    }
  } else {
    return next(errorGen.createErrorObj('tripController.createTrip error', 'Required fields are missing or empty'));
  }
}

tripController.getTripsByUser = async (req, res, next) => {
  try {
    const params = [req.params.userId];
    const query = `
    SELECT _id AS TripId, name AS TripName, startDate, endDate, userId, imageUrl
    FROM Trip
    WHERE userid=$1
    `;
  
    const { rows } = await db.query(query, params);

    res.locals.trips = rows;
    return next();
  } catch (error) {
    return next(errorGen.createErrorObj('tripController.getTripsByUser error', err.message));
  }
}

module.exports = tripController;