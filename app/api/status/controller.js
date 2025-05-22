const mongo = require("../../lib/mongodb")

exports.currentStatus = function (req, res) {
  if (mongo.readyState === mongo.ReadyStates.connected) {
    // could use 204 here and omit the body
    res.status(200).send({
      status: 'OK'
    })
  } else {
    // same here, status is redundant but could be replaced for a descriptive error message
    res.status(503).send({
      status: 'Service Unavailable',
    })
  }
}
