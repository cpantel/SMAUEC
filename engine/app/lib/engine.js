const Activity = require('./activity');
const Action = require('./action');
const Rule = require('./rule');

class Engine {
  constructor () {
     this.rules = new Map();
     this.actions = new Map();

  }

  matchRule(topic,value) {
    if ( this.rules.has(topic+"/"+value) ) {
       return this.rules.get(topic+"/"+value).action; 

    }
    return null;
  }

  addRule(rule,action) {
    rule.action = action;
    this.rules.set(rule.topic +"/"+ rule.activation_value, rule);
  }
};

module.exports = Engine;
