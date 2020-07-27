const { authJwt } = require("../middleware");
const controller = require("../controllers/activity.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/activities/:activityId",
    [
      authJwt.verifyToken,
    ],
    controller.findOne
  );

  app.get(
    "/api/activities",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );


  app.post(
    "/api/activities",
    [
      authJwt.verifyToken
    ],
    controller.create
  );
};
