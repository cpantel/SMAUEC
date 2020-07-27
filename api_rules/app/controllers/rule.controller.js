const db = require("../models");
const Op = db.Sequelize.Op;
const Rule = db.rule;
const Action = db.action;

var findTheOne = (id,res,status) => {
  Rule.findByPk(id,{
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }
  ).then(rule => {
    if (null == rule) {
      res.status(403).send("Rule not found"); 
    } else {
      res.status(status).send(rule);
    }
  }).catch(err => {
    return res.status(403).send("Rule not found");
  }
 )
}

exports.findOne = (req, res) => {
  return findTheOne(req.params.ruleId,res,200);
};

exports.findAll = (req, res) => {
  Rule.findAll({
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }).then(rules => {
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


exports.create = (req, res) => {

  Rule.create(req.body).then(rule => {
    return findTheOne(rule.id,res,201);
  }).catch(err => {
      res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
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
     return findTheOne(req.body.id,res,201);
    }
  }).catch(err => {
    return res.status(500).send("Server error 02");
  })  
};
