const db = require("../models");
const Op = db.Sequelize.Op;
const Rule = db.rule;
const Action = db.action;

exports.findOne = (req, res) => {
  Rule.findByPk(req.params.ruleId,{
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }
  ).then(rule => {
    res.status(200).send(rule);
  }).catch(err => {
    return res.status(403).send("Rule not found");
  }
)};

exports.findAll = (req, res) => {
  Rule.findAll({
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }

  ).then(rules => {
    res.status(200).send(rules);
  })}

exports.delete = (req, res) => {
  console.log ("DELETE called");
  Rule.destroy(
    {where: {id: req.params.ruleId}}
  ).then( num=> {
     if (1 == num) {
        res.status(201).send({message:"Rule deleted"})
     } else { 
      res.status(401).send({message:"Rule not found"})
     }}
  );
}

// Create and Save a new Rule
exports.create = (req, res) => {
  // Save Rule to Database
  Rule.create({
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
            res.status(201).send({ message: "Rule registered successfully!", id:user.id });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(201).send({ message: "Rule registered successfully!", id:user.id });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Update a Rule by the id in the request
exports.update = (req, res) => {
  console.log("UPDATE 01 " + req.body.id);
  console.log("UPDATE 02 " + req.body);
  Rule.update(
   req.body, 
   { where: { id: req.body.id },

    include: [{
      model: Action

    }]
   }
  ).then(rule => {
    if (null == rule) {
      res.status(403).send("Rule not found"); 
    } else {
      Rule.findByPk(req.body.id,
        { attributes: {
            exclude: ['createdAt', 'updatedAt','actionId']
          },

    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
        } 
      ).then(modified => {
          res.status(201).send(modified);/*
        if (null == modified) {
          res.status(403).send("Rule not found"); 
        } else {
          console.log("UPDATE 03 " + modified.name);
          res.status(201).send(modified);
        }*/
      })/*.catch(err => {
        return res.status(500).send("Server error 01");
      })*/
    }
  }).catch(err => {
    return res.status(500).send("Server error 02");
  })  
};

