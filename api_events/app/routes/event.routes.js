const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(function(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body).replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    next();
  });

  app.get(
    "/api/events",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );

  app.post(
    "/api/events",
    [
      authJwt.verifyToken,
    ],
    controller.create
  );


};
