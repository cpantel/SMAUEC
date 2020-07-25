const config = require("./app/config/user.config." + process.env.NODE_ENV + ".js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8082"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
//const Rule = db.rule;
const Action = db.action;

if ("prod" == process.env.NODE_ENV) {
  db.sequelize.sync();
} else {
// force: true will drop the table if it already exists
   db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   const fixture = require("./test/fixtures/initial.js");
   fixture.initial(Action);
 });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smauec rules application." });
});

// routes
//require('./app/routes/rule.routes')(app);
require('./app/routes/action.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



