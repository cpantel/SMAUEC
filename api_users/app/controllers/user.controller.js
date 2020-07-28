const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Role = db.role;
var bcrypt = require("bcryptjs");

var findTheOne = (id, res, status) => {
  User.findByPk(
    id, 
    { attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      },
      include: [
        {
          model: Role,
          attributes: ['id','name'],
          through: {
            attributes: []
          }
        }
      ]
    }
  ).then(user => {
    if (null == user) {
      return res.status(403).send("User not found");
    } else {
      return res.status(status).send(user)
    }
  }).catch(err => {
    return res.status(500).send("User not found");
  }
)};

exports.findOne = (req, res) => {
  return findTheOne(req.params.userId, res, 200);
};


exports.findAll = (req, res) => {
  User.findAll({
    attributes: ['id', 'username','email'],
    include: [{
      model: Role,
      attributes: ['id','name'],
      through: {
        attributes: []
      }
    }]
  }).then(users => {
    res.status(200).send(users);
  })}

exports.delete = (req, res) => {
  console.log ("DELETE called");
  User.destroy(
    {where: {id: req.params.userId}}
  ).then( num=> {
     if (1 == num) {
        res.status(201).send({message:"User deleted"})
     } else { 
      res.status(401).send({message:"User not found"})
     }}
  );
}

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
            return findTheOne(user.id,res,201);
            res.status(201).send({ message: "User registered successfully!", id:user.id });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          return findTheOne(user.id,res,201);
          res.status(201).send({ message: "User registered successfully!", id:user.id });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  
};

