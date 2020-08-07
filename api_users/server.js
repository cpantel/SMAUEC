const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/user.config." + process.env.NODE_ENV + ".js");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

var bcrypt = require("bcryptjs");

if ("test" == process.env.NODE_ENV) {
  const fixture = require("./test/fixtures/initial.js");
  

  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    fixture.initial(User,Role,config,bcrypt);
  });
} else {
  db.sequelize.sync();
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smauec user and authentication application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`######### Auth and User Server is running on port ${PORT} #########`);
});

