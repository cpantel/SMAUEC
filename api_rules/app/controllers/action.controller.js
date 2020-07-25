const db = require("../models");
const Action = db.action;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  console.log ("find one action: " + req.params.actionId);
  Action.findByPk(req.params.actionId,
    { attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    } 
  ).then(action => {
    if (null == action) {
      res.status(403).send("Action not found"); 
    } else {
      res.status(200).send(action);
    }
  }).catch(err => {
    return res.status(500).send("Server error");
  }
)};

exports.findAll = (req, res) => {

  Action.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
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

exports.create = (req, res) => {
  Action.create({
    name: req.body.name,
    description: req.body.description,
    topic: req.body.topic,
    min_activation_time: req.body.min_activation_time,
    activation_value: req.body.activation_value,
    cancellation_value: req.body.cancellation_value
  })
    .then(action => {
      res.status(201).send(action);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  console.log("UPDATE 01 " + req.body.id);
  console.log("UPDATE 02 " + req.body);

  Action.update(
   req.body, 
   { where: { id: req.body.id } }
  ).then(action => {
    if (null == action) {
      res.status(403).send("Action not found"); 
    } else {
      Action.findByPk(req.body.id,
        { attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        } 
      ).then(action => {
        if (null == action) {
          res.status(403).send("Action not found"); 
        } else {
          res.status(201).send(action);
        }
      }).catch(err => {
        return res.status(500).send("Server error");
      })
    }
  }).catch(err => {
    return res.status(500).send("Server error");
  })

/*
  Action.findByPk(req.body.id,
    { attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    } 
  ).then(action => {
    if (null == action) {
      res.status(403).send("Action not found"); 
    } else {
      action.update(req.params).then( modified => {
          res.status(201).send(modified);
      })
    }
  }).catch(err => {
    return res.status(500).send("Server error");
  })
*/
};

// Delete all Actions from the database.
exports.deleteAll = (req, res) => {
  
};

