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
const Role = db.role;

if (true) {
  db.sequelize.sync();
} else {
// force: true will drop the table if it already exists
   db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
 });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smauec rules application." });
});

// routes
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
