const errorModel = {};

// Input: log string, message string
// Output: Error object with log and message properties defined according to global error handler
errorModel.createErrorObj = (log, message) => {
  console.log(message);
  return {
    log: log,
    message: { err: message }
  };
}

module.exports = errorModel;