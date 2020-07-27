const db = require("../models");
const Op = db.Sequelize.Op;
const Activity = db.activity;
const Action = db.action;
const Rule = db.rule;

var findTheOne = (id,res,status) => {
  Activity.findByPk(id,{
    attributes: {
        exclude: ['updatedAt', 'actionId','ruleId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    },{
      model: Rule,
      attributes: ['id','name'],
    }]
  }
  ).then(activity => {
    if (null == activity) {
      res.status(403).send("Activity not found"); 
    } else {
      res.status(status).send(activity);
    }
  }).catch(err => {
    return res.status(403).send("Activity not found");
  }
 )
}

exports.findOne = (req, res) => {
  return findTheOne(req.params.activityId,res,200);
};

exports.findAll = (req, res) => {
  Activity.findAll({
    attributes: {
        exclude: ['updatedAt', 'actionId', 'ruleId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    },
    {
      model: Rule,
      attributes: ['id','name'],
    },
    ]
  }

  ).then(activities => {
    res.status(200).send(activities);
  })}

exports.create = (req, res) => {
  // TODO: check consistency between Rule and Action
  Activity.create(req.body).then(activity => {
    return findTheOne(activity.id,res,201);
  }).catch(err => {
      res.status(500).send({ message: err.message });
  });
};
