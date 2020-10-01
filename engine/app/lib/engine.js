//const Activity = require('./activity');
const Action = require('./action');
const Rule = require('./rule');

class Engine {
  constructor () {
     this.rules = new Map();
     this.actions = new Map();
  }

  addRuleAction(rule,action) {
    rule.action = action;
    this.rules.set(rule.topic +"/"+ rule.activation_value, rule);
  }

  getAllActions() {
    return Array.from(this.actions).map(pair=> pair[1]);
  }

  processRuleAction(topic,value) {
    if ( this.rules.has(topic+"/"+value) ) {
      var rule = this.rules.get(topic+"/"+value);
      this.actions.set(rule.action.topic+"/"+rule.action.value, rule.action);  
    }
  }


};

module.exports = Engine;
