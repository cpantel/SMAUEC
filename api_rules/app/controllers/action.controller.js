const db = require("../models");
const Action = db.action;
const Op = db.Sequelize.Op;

var findTheOne = (id,res,status) => {
  Action.findByPk(id,{
    attributes: {
        exclude: ['updatedAt', 'createdAt','actionId']
      }
  }
  ).then(action => {
    if (null == action) {
      res.status(403).send("Action not found"); 
    } else {
      res.status(status).send(action);
    }
  }).catch(err => {
    return res.status(403).send("Action not found");
  }
 )
}
exports.findOne = (req, res) => {
  return findTheOne(req.params.actionId, res, 200);
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
  Action.create(req.body)
    .then(action => {
      res.status(201).send(action);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  Action.update(
   req.body, 
   { where: { id: req.body.id } }
  ).then(action => {
    if (null == action) {
      res.status(403).send("Action not found"); 
    } else {
      return findTheOne(req.body.id,res,201);
    }
  }).catch(err => {
    return res.status(500).send("Server error");
  })
};

