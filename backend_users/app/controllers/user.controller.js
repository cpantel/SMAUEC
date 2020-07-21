exports.allAccess = (req, res) => {
  console.log("user controller all access");
  res.status(200).send(process.env.npm_package_name + " Public Content.");
};

exports.userBoard = (req, res) => {
  console.log("user controller user access");
  res.status(200).send(process.env.npm_package_name + " User Content.");
};

exports.adminBoard = (req, res) => {
  console.log("user controller admin access");
  res.status(200).send(process.env.npm_package_name + " Admin Content.");
};



const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new User
exports.create = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)   // TODO: move to middleware
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(201).send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(201).send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};

// Find a single User with an id
exports.findOne = (req, res) => {
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  
};

