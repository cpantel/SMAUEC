const db = require("../models");
const Action = db.action;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {/*
  Action.findByPk(req.params.actionId  ).then(action => {

    action.getRoles().then(rules => {

      var ruleNames = rules.map( rule => { return rule.name });

      res.status(200).send(
         {
            "id": action.id,
            "actionname": action.actionname,
            "email" : action.email,
            "rules": ruleNames
         }
      );
    });
  }).catch(err => {
    return res.status(403).send("Action not found");
  }
)*/};

exports.findAll = (req, res) => {

  Action.findAll({
    attributes: ['id', 'name','description','topic','min_activation_time','activation_value','cancellation_value']
  }

  ).then(actions => {
    res.status(200).send(actions);
  })}

exports.delete = (req, res) => {
  console.log ("DELETE called");
  Action.destroy(
    {where: {id: req.params.actionId}}
  ).then( num=> {
     if (1 == num) {
        res.status(201).send({message:"Action deleted"})
     } else { 
      res.status(401).send({message:"Action not found"})
     }}
  );
}

// Create and Save a new Action
exports.create = (req, res) => {
  // Save Action to Database
  Action.create({
    name: req.body.name,
    description: req.body.description,
    topic: req.body.topic,
    min_activation_time: req.body.min_activation_time,
    activation_value: req.body.activation_value,
    cancellation_value: req.body.cancellation_value
  })
    .then(action => {
      res.status(201).send({ message: "Action registered successfully!", id:action.id });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Update a Action by the id in the request
exports.update = (req, res) => {
  
};

// Delete all Actions from the database.
exports.deleteAll = (req, res) => {
  
};

