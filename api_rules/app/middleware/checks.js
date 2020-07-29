const jwt = require("jsonwebtoken");
const config = require("../config/auth.config." + process.env.NODE_ENV + ".js");

checkRuleId = (req, res, next) => {
  return checkId(req,res,next,"ruleId");
}

checkActionId = (req, res, next) => {
  return checkId(req,res,next,"actionId");
}

checkId = (req, res, next, subject) => {
  if (req.body.id == undefined) {
    req.body.id = req.params[subject];
    next();
  }

  if (req.body.id != req.params[subject]) {
    return res.status(400).send({
      message: "Bad request inconsistent id"
    });  
  }
  next();
}

const checks = {
  checkRuleId: checkRuleId,
  checkActionId: checkActionId
};
module.exports = checks;
