const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
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

if (false) {
  db.sequelize.sync();
} else {
// force: true will drop the table if it already exists
 db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   initial();
 });
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
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 0,
    name: "admin"
  });

  Role.create({
    id: 1,
    name: "user"
  });

  // TODO: take from configuration or generate password and publish it in log
  User.create({
    id: 0,
    username: "admin",
    email: "admin@samauec.org",
    password: bcrypt.hashSync("admin", 8)
  }).then(user => {
          user.setRoles([0, 1])
  });
}
